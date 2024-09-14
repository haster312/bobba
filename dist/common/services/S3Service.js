"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const sharp = require("sharp");
const uuid_1 = require("uuid");
let S3Service = class S3Service {
    constructor(configService) {
        this.configService = configService;
        this.extension = 'jpeg';
        this.mimeType = 'image/jpeg';
        this.bucketName = this.configService.get('AWS.S3_PRODUCT_BUCKET');
        this.client = new client_s3_1.S3Client({
            region: this.configService.get('AWS.REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS.ACCESS_KEY'),
                secretAccessKey: this.configService.get('AWS.ACCESS_SECRET'),
            },
        });
    }
    async uploadBase64(base64String) {
        const matches = base64String.match(/^data:(.+);base64,(.+)$/);
        if (!matches) {
            throw new common_1.BadRequestException('Invalid base64 string');
        }
        const mimeType = matches[1];
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedMimeTypes.includes(mimeType)) {
            throw new common_1.BadRequestException('Unsupported image type. Only JPEG, PNG, and GIF are allowed.');
        }
        const base64Data = matches[2];
        const key = `${(0, uuid_1.v4)()}.${this.extension}`;
        let buffer = Buffer.from(base64Data, 'base64');
        buffer = await this.resizeMainImageWithPercentage(buffer);
        const uploadParams = {
            Bucket: this.bucketName,
            Key: key,
            Body: buffer,
            ContentType: 'image/jpeg',
        };
        try {
            await this.client.send(new client_s3_1.PutObjectCommand(uploadParams));
            return this.getS3ProductUrl(this.bucketName, key);
        }
        catch (err) {
            throw new common_1.BadRequestException(`Failed to upload file: ${err.message}`);
        }
    }
    async resizeMainImageWithPercentage(buffer) {
        const image = await sharp(buffer);
        const metadata = await image.metadata();
        if (!metadata.width || !metadata.height) {
            throw new Error('Could not retrieve image dimensions');
        }
        let newWidth;
        let newHeight;
        if (metadata.width > 1024) {
            newWidth = 1024;
            newHeight = Math.round((newWidth / metadata.width) * metadata.height);
        }
        else if (metadata.height > 1024) {
            newHeight = 1024;
            newWidth = Math.round((newHeight / metadata.height) * metadata.width);
        }
        return await image
            .resize(newWidth, newHeight, { fit: sharp.fit.inside })
            .jpeg({ quality: 80 })
            .toBuffer();
    }
    getS3ProductUrl(bucketName, key) {
        return `https://${bucketName}.s3.${this.configService.get('AWS.REGION')}.amazonaws.com/${key}`;
    }
    async uploadFile(base64Content) {
        const bucketName = this.configService.get('AWS.S3_PRODUCT_BUCKET');
        const key = `${(0, uuid_1.v4)()}.${this.extension}`;
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: base64Content,
            ContentType: this.mimeType,
        };
        await this.client.send(new client_s3_1.PutObjectCommand(params));
        return this.getS3ProductUrl(bucketName, key);
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3Service);
//# sourceMappingURL=S3Service.js.map