import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseModel } from "./base.model";
import {AddonType} from "./addon.model";

export type ProductDocument = HydratedDocument<Product>;
export enum ProductCategory {
    DRINK = "drink", FOOD = "food"
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

    @Prop({ required: true, enum: Object.values(ProductCategory) })
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

    @Prop({ required: false })
    flavor: [];
    @Prop({ required: false })
    condiment: [];
    @Prop({ required: false })
    topping: [];
    @Prop({ required: false })
    base: [];
}

export const ProductsModel = SchemaFactory.createForClass(Product);
