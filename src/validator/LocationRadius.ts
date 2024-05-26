import { IsNumber } from "class-validator";

export class LocationRadius {
    @IsNumber()
    lat: number;

    @IsNumber()
    long: number;

    @IsNumber()
    distance: number;
}
