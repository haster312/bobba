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
import { ProductCategory } from "./products.model";
export type AddonDocument = HydratedDocument<Addon>;
export declare enum AddonType {
    BASE = "base",
    FLAVOR = "flavor",
    TOPPING = "topping",
    CONDIMENT = "condiment"
}
export declare class Addon extends BaseModel {
    name: string;
    type: AddonType;
    price: number;
    category: ProductCategory;
}
export declare const AddonModel: import("mongoose").Schema<Addon, import("mongoose").Model<Addon, any, any, any, import("mongoose").Document<unknown, any, Addon> & Addon & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Addon, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Addon>> & import("mongoose").FlatRecord<Addon> & Required<{
    _id: string;
}>>;
