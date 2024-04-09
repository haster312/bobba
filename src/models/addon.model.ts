import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseModel } from "./base.model";
import {ProductCategory} from "./products.model";

export type AddonDocument = HydratedDocument<Addon>;

export enum AddonType {
    BASE = "base",
    FLAVOR = "flavor",
    TOPPING = "topping",
    CONDIMENT = "condiment"
}

@Schema({
    versionKey: false
})
export class Addon extends BaseModel {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, enum: Object.values(AddonType) })
    type: AddonType;

    @Prop()
    price: number;

    @Prop({ required: true, enum: Object.values(ProductCategory) })
    category: ProductCategory;
}

export const AddonModel = SchemaFactory.createForClass(Addon);
