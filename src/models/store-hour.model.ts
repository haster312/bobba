import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {HydratedDocument, ObjectId, Types} from "mongoose";
import { BaseModel } from "./base.model";
import { Store } from "./stores.model";

export type StateDocument = HydratedDocument<StoreHour>;
@Schema({
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    versionKey: false
})
export class StoreHour extends BaseModel {
    @Prop({ type: Types.ObjectId, ref: Store.name, required: true })
    storeId: Types.ObjectId;

    @Prop({ required: true })
    day: string;

    @Prop({ required: true })
    open: string;

    @Prop({ required: false })
    close: string;
}


export const StoreHourModel = SchemaFactory.createForClass(StoreHour);