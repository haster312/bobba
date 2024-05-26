import { IsString } from "class-validator";

export class CountryCode {
    @IsString()
    countryCode: string;
}
