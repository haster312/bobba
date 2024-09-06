import { IsString } from "class-validator";

export class ValidateDeleteToken {
    @IsString()
    deleteToken: string;
}
