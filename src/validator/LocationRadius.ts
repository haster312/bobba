import {IsNotEmpty, IsNumber, IsNumberString, IsString} from "class-validator";

export class LocationRadius {
    lat?: number;
    long?: number;
    radius?: number;

    @IsNotEmpty({ message: "State is required" })
    state: string;

    @IsNumberString()
    page: number = 1;

    limit: number = 10;
}
