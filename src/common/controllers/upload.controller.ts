import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards
} from "@nestjs/common";
import {S3Service} from "../services/S3Service";
import {JwtAuthGuard} from "../../auth/jwt-auth-guard";
import {UploadDto} from "../dto/upload.dto";

@Controller("upload")
export class UploadController  {
    constructor(private s3Service: S3Service) {}

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/image/single')
    async getAllStores(@Body() uploadDto: UploadDto, @Req() req, @Res() res) {
        try {
            const { fileContent } = uploadDto;
            const uploadedUrl = await this.s3Service.uploadBase64(fileContent);

            return res.status(HttpStatus.OK).send({
                url: uploadedUrl
            });
        } catch (e) {
            if (e instanceof BadRequestException) {
                return res.status(HttpStatus.BAD_REQUEST).send({ message: e.message });
            }

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
        }

    }


}