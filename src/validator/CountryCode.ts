import {IsOptional, IsString} from "class-validator";

export class CountryCode {
    @IsString()
    @IsOptional()
    countryCode: string;
}
