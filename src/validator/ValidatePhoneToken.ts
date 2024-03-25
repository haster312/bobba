import { IsString } from "class-validator";

export class ValidatePhoneToken {
    @IsString()
    phoneNumber: string;

    @IsString()
    verifyToken: string;
}
