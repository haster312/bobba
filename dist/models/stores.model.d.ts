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
export type StoreDocument = HydratedDocument<Store>;
export declare class Store extends BaseModel {
    storeNumber: string;
    fax: string;
    email: string;
    storeName: string;
    storeAddress: string;
    lat: number;
    long: number;
    geometry: Object;
    city: string;
    state: string;
    stateName: string;
    postalCode: string;
    countryCode: string;
    country: string;
    url: string;
}
export declare const StoresModel: import("mongoose").Schema<Store, import("mongoose").Model<Store, any, any, any, import("mongoose").Document<unknown, any, Store> & Store & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Store, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Store>> & import("mongoose").FlatRecord<Store> & Required<{
    _id: string;
}>>;
