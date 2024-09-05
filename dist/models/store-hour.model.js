"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreHourModel = exports.StoreHour = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_model_1 = require("./base.model");
const stores_model_1 = require("./stores.model");
let StoreHour = class StoreHour extends base_model_1.BaseModel {
};
exports.StoreHour = StoreHour;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: stores_model_1.Store.name, required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], StoreHour.prototype, "storeId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], StoreHour.prototype, "day", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], StoreHour.prototype, "open", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], StoreHour.prototype, "close", void 0);
exports.StoreHour = StoreHour = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
        versionKey: false
    })
], StoreHour);
exports.StoreHourModel = mongoose_1.SchemaFactory.createForClass(StoreHour);
//# sourceMappingURL=store-hour.model.js.map