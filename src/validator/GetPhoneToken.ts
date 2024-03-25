import { IsString } from "class-validator";

export class GetPhoneToken {
    @IsString()
    phoneNumber: string;
}
