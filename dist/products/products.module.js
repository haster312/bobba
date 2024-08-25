"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const products_controller_1 = require("./products.controller");
const mongoose_1 = require("@nestjs/mongoose");
const products_model_1 = require("../models/products.model");
const addon_model_1 = require("../models/addon.model");
const products_repository_1 = require("../repositories/products.repository");
const addon_repository_1 = require("../repositories/addon.repository");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: products_model_1.Product.name, schema: products_model_1.ProductsModel }]),
            mongoose_1.MongooseModule.forFeature([{ name: addon_model_1.Addon.name, schema: addon_model_1.AddonModel }])
        ],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService, products_repository_1.ProductsRepository, addon_repository_1.AddonRepository],
        exports: [products_service_1.ProductsService, products_repository_1.ProductsRepository, addon_repository_1.AddonRepository]
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map