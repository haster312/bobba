/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { HydratedDocument } from "mongoose";
import { BaseModel } from "./base.model";
import { Addon } from "./addon.model";
export type OrderDocument = HydratedDocument<Order>;
export declare enum OrderStatus {
    PENDING = "pending",
    CANCELED = "canceled",
    REJECTED = "rejected",
    ACCEPTED = "accepted",
    PREPARING = "preparing",
    READY = "ready",
    COMPLETE = "complete"
}
export declare class Order extends BaseModel {
    userId: string;
    storeId: string;
    status: OrderStatus;
    totalAmount: number;
    items: Array<{
        id: string;
        notes?: string;
        quantity: number;
        price: number;
        flavor: Addon[];
        condiment: Addon[];
        topping: Addon[];
        base: Addon[];
    }>;
    paymentIntentId: string;
    pickupTime: Date;
}
export declare const OrdersModel: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, import("mongoose").Document<unknown, any, Order> & Order & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Order>> & import("mongoose").FlatRecord<Order> & Required<{
    _id: string;
}>>;
