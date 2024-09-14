import { PutObjectCommand, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import {BadRequestException, Injectable} from '@nestjs/common';
import axios from 'axios';
import * as sharp from 'sharp';
import { v4 as uuid } from 'uuid';

export interface ImagePath {
  main: string;
  thumbnail: string;
}

@Injectable()
export class S3Service {
  private client: S3Client;
  private extension = 'jpeg';
  private mimeType = 'image/jpeg';
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.get('AWS.S3_PRODUCT_BUCKET');
    this.client = new S3Client({
      region: this.configService.get('AWS.REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS.ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS.ACCESS_SECRET'),
      },
    });
  }

  async uploadBase64(base64String: string) {
    // Separate metadata and base64 data
    const matches = base64String.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      throw new BadRequestException('Invalid base64 string');
    }

    const mimeType = matches[1];
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedMimeTypes.includes(mimeType)) {
      throw new BadRequestException('Unsupported image type. Only JPEG, PNG, and GIF are allowed.');
    }

    const base64Data = matches[2];
    const key = `${uuid()}.${this.extension}`;

    // Convert base64 to binary buffer
    let buffer = Buffer.from(base64Data, 'base64');
    buffer = await this.resizeMainImageWithPercentage(buffer);

    // Create upload params
    const uploadParams = {
      Bucket: this.bucketName,
      Key: key,
      Body: buffer,
      ContentType: 'image/jpeg',
    };

    try {
      await this.client.send(new PutObjectCommand(uploadParams));

      return this.getS3ProductUrl(this.bucketName, key);
    } catch (err) {
      throw new BadRequestException(`Failed to upload file: ${err.message}`);
    }
  }

  async resizeMainImageWithPercentage(buffer) {
    // Get the original dimensions of the image
    const image = await sharp(buffer);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error('Could not retrieve image dimensions');
    }

    let newWidth: number;
    let newHeight: number;
    if (metadata.width > 1024) {
      // Calculate the new dimensions based on the percentage
      newWidth = 1024;
      newHeight = Math.round((newWidth / metadata.width) * metadata.height);
    } else if (metadata.height > 1024) {
      newHeight = 1024;
      newWidth = Math.round((newHeight / metadata.height) * metadata.width);
    }

    // Resize the image using sharp
    return await image
      .resize(newWidth, newHeight, { fit: sharp.fit.inside })
      .jpeg({ quality: 80 })
      .toBuffer();
  }

  getS3ProductUrl(bucketName, key) {
    return `https://${bucketName}.s3.${this.configService.get('AWS.REGION')}.amazonaws.com/${key}`;
  }

  async uploadFile(base64Content: string): Promise<string> {
    const bucketName = this.configService.get('AWS.S3_PRODUCT_BUCKET');
    const key = `${uuid()}.${this.extension}`;

    const params = {
      Bucket: bucketName,
      Key: key,
      Body: base64Content,
      ContentType: this.mimeType,
    };

    await this.client.send(new PutObjectCommand(params));

    return this.getS3ProductUrl(bucketName, key);
  }
}
