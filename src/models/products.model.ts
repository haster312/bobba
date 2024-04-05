import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseModel } from "./base.model";

export type ProductDocument = HydratedDocument<Product>;

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

    @Prop({ required: true })
    productPrice: number;

    @Prop({})
    productImage: string;
}

export const ProductsModel = SchemaFactory.createForClass(Product);
