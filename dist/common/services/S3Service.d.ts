import { ConfigService } from '@nestjs/config';
export interface ImagePath {
    main: string;
    thumbnail: string;
}
export declare class S3Service {
    private configService;
    private client;
    private extension;
    private mimeType;
    private bucketName;
    constructor(configService: ConfigService);
    uploadBase64(base64String: string): Promise<string>;
    resizeMainImageWithPercentage(buffer: any): Promise<any>;
    getS3ProductUrl(bucketName: any, key: any): string;
    uploadFile(base64Content: string): Promise<string>;
}
