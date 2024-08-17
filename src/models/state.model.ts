import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseModel } from "./base.model";
import {AddonType} from "./addon.model";

export type StateDocument = HydratedDocument<State>;

@Schema({
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    versionKey: false
})
export class State extends BaseModel {
    @Prop({ required: true })
    stateName: string;

    @Prop({ required: true })
    countryName: string;

    @Prop({ required: true })
    countryCode: string;
}

export const StateModel = SchemaFactory.createForClass(State);