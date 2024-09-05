import {IsBoolean, IsBooleanString, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString} from "class-validator";

export class LocationRadius {
    @IsNumberString()
    @IsOptional()
    lat?: number;
    @IsNumberString()
    @IsOptional()
    long?: number;
    @IsNumberString()
    @IsOptional()
    radius?: number;

    @IsNotEmpty({ message: "State is required" })
    state: string;

    @IsNumberString()
    page: number = 1;

    limit: number = 10;

    @IsBooleanString()
    @IsOptional()
    is_open?: string;
}
