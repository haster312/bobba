import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseModel } from "./base.model";
import {AddonType} from "./addon.model";

export type ProductDocument = HydratedDocument<Product>;
export enum ProductCategory {
    DRINK, FOOD
}

@Schema({
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    versionKey: false
})
export class Product extends BaseModel {
    @Prop({ required: true })
    productName: string;

    @Prop({ required: true })
    productDescription: string;

    @Prop({ required: true, enum: Object.values(ProductCategory).filter(value => typeof value === "string")})
    productCategory: ProductCategory;

    @Prop({ required: true })
    productPrice: number;

    @Prop({})
    productImage: string;

    @Prop({ default: 0 })
    hasFlavor: number;

    @Prop({ default: 0 })
    hasBase: number;

    @Prop({ default: 0 })
    hasCondiment: number;

    @Prop({ default: 0 })
    hasTopping: number;
}

export const ProductsModel = SchemaFactory.createForClass(Product);
