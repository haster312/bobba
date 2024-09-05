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
exports.ProductsModel = exports.Product = exports.ProductCategory = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_model_1 = require("./base.model");
var ProductCategory;
(function (ProductCategory) {
    ProductCategory["DRINK"] = "drink";
    ProductCategory["FOOD"] = "food";
})(ProductCategory || (exports.ProductCategory = ProductCategory = {}));
let Product = class Product extends base_model_1.BaseModel {
};
exports.Product = Product;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "productDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.values(ProductCategory) }),
    __metadata("design:type", String)
], Product.prototype, "productCategory", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "productPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], Product.prototype, "productImage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "hasFlavor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "hasBase", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "hasCondiment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "hasTopping", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Array)
], Product.prototype, "flavor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Array)
], Product.prototype, "condiment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Array)
], Product.prototype, "topping", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Array)
], Product.prototype, "base", void 0);
exports.Product = Product = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
        versionKey: false
    })
], Product);
exports.ProductsModel = mongoose_1.SchemaFactory.createForClass(Product);
//# sourceMappingURL=products.model.js.map