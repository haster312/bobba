import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseModel } from "./base.model";

export type AddonDocument = HydratedDocument<Addon>;

export enum AddonType {
    BASE,
    FLAVOR,
    TOPPING,
    CONDIMENT
}

@Schema({
    versionKey: false
})
export class Addon extends BaseModel {
    @Prop({ required: true })
    addonName: string;

    @Prop({ required: true, enum: Object.values(AddonType).filter(value => typeof value === "string") })
    addonType: AddonType;

    @Prop({ required: true })
    addonPrice: number;
}

export const AddonModel = SchemaFactory.createForClass(Addon);
