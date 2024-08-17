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
exports.StoresModel = exports.Store = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_model_1 = require("./base.model");
let Store = class Store extends base_model_1.BaseModel {
};
exports.Store = Store;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Store.prototype, "storeNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Store.prototype, "fax", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Store.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Store.prototype, "storeName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Store.prototype, "storeAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Store.prototype, "lat", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Store.prototype, "long", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: { type: String }, coordinates: Array }),
    __metadata("design:type", Object)
], Store.prototype, "geometry", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Store.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Store.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Store.prototype, "stateName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Store.prototype, "postalCode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Store.prototype, "countryCode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Store.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Store.prototype, "url", void 0);
exports.Store = Store = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
        versionKey: false
    })
], Store);
exports.StoresModel = mongoose_1.SchemaFactory.createForClass(Store).index({ geometry: "2dsphere" });
exports.StoresModel.virtual('hours', {
    ref: 'StoreHour',
    localField: '_id',
    foreignField: 'storeId',
});
exports.StoresModel.set('toObject', { virtuals: true });
exports.StoresModel.set('toJSON', { virtuals: true });
//# sourceMappingURL=stores.model.js.map