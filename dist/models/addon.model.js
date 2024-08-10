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
exports.AddonModel = exports.Addon = exports.AddonType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_model_1 = require("./base.model");
const products_model_1 = require("./products.model");
var AddonType;
(function (AddonType) {
    AddonType["BASE"] = "base";
    AddonType["FLAVOR"] = "flavor";
    AddonType["TOPPING"] = "topping";
    AddonType["CONDIMENT"] = "condiment";
})(AddonType || (exports.AddonType = AddonType = {}));
let Addon = class Addon extends base_model_1.BaseModel {
};
exports.Addon = Addon;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Addon.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(AddonType) }),
    __metadata("design:type", String)
], Addon.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Addon.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(products_model_1.ProductCategory) }),
    __metadata("design:type", String)
], Addon.prototype, "category", void 0);
exports.Addon = Addon = __decorate([
    (0, mongoose_1.Schema)({
        versionKey: false
    })
], Addon);
exports.AddonModel = mongoose_1.SchemaFactory.createForClass(Addon);
//# sourceMappingURL=addon.model.js.map