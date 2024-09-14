import { S3Service } from "../services/S3Service";
import { UploadDto } from "../dto/upload.dto";
export declare class UploadController {
    private s3Service;
    constructor(s3Service: S3Service);
    getAllStores(uploadDto: UploadDto, req: any, res: any): Promise<any>;
}
