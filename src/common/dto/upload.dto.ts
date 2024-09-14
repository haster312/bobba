import { IsString } from "class-validator";

export class UploadDto {
    @IsString()
    fileContent: string;
}