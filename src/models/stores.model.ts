import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseModel } from "./base.model";

export type StoreDocument = HydratedDocument<Store>;

@Schema({
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    versionKey: false
})
export class Store extends BaseModel {
    @Prop({ required: true })
    storeNumber: number;

    @Prop({ required: true })
    storeName: string;

    @Prop({ required: true })
    storeAddress: string;

    @Prop()
    lat: number;

    @Prop()
    long: number
}

export const StoresModel = SchemaFactory.createForClass(Store);
