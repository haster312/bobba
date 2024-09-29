import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseModel } from "./base.model";
import {Addon, AddonType} from "./addon.model";  // Import the AddonType enum

export type OrderDocument = HydratedDocument<Order>;

export enum OrderStatus {
    PENDING = "pending",
    CANCELED = "canceled",
    REJECTED = "rejected",
    ACCEPTED = "accepted",
    PREPARING = "preparing",
    READY = "ready",
    COMPLETE = "complete",
}

@Schema({
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    versionKey: false
})
export class Order extends BaseModel {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    storeId: string;

    @Prop({ type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING })
    status: OrderStatus;

    @Prop({ required: true })
    totalAmount: number;

    @Prop()
    items: Array<{
        id: string;
        notes?: string;
        quantity: number;
        price: number;
        flavor: Addon[];
        condiment: Addon[];
        topping: Addon[];
        base: Addon[];
    }>; // Ordered products with addons

    @Prop()
    paymentIntentId: string; // Stripe payment intent ID for holding money

    @Prop()
    pickupTime: Date;
}

export const OrdersModel = SchemaFactory.createForClass(Order);