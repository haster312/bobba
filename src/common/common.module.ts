import {Module} from "@nestjs/common";
import {S3Service} from "./services/S3Service";
import {UploadController} from "./controllers/upload.controller";
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [],
    controllers: [UploadController],
    providers: [S3Service, ConfigService],
    exports: [S3Service]
})

export class CommonModule {}