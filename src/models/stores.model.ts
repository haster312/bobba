import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseModel } from "./base.model";

export type StoreDocument = HydratedDocument<Store>;
interface Geometry {
    type: string,
    coordinates: Array<number>
}

@Schema({
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    versionKey: false
})

export class Store extends BaseModel {
    @Prop({ required: true })
    storeNumber: string;

    @Prop()
    fax: string;

    @Prop()
    email: string;

    @Prop({ required: true })
    storeName: string;

    @Prop({ required: true })
    storeAddress: string;

    @Prop()
    lat: number;

    @Prop()
    long: number;

    @Prop({ type: { type: String }, coordinates: Array })
    geometry: Object;

    @Prop()
    city: string;

    @Prop()
    state: string;

    @Prop()
    stateName: string;

    @Prop()
    postalCode: string;

    @Prop()
    countryCode: string;

    @Prop()
    country: string;

    @Prop()
    url: string;
}

export const StoresModel = SchemaFactory.createForClass(Store).index({ geometry: "2dsphere" });

StoresModel.virtual('hours', {
    ref: 'StoreHour',
    localField: '_id', // Find storeHours where `localField` is equal to `foreignField`
    foreignField: 'storeId',
});

StoresModel.set('toObject', { virtuals: true });
StoresModel.set('toJSON', { virtuals: true });