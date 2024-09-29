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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("./base.repository");
const products_model_1 = require("../models/products.model");
let ProductsRepository = class ProductsRepository extends base_repository_1.BaseRepository {
    constructor(productRepository) {
        super(productRepository);
        this.productRepository = productRepository;
    }
    async getDrinkProduct() {
        return this.model.find({
            productCategory: products_model_1.ProductCategory.DRINK
        });
    }
    async getFoodProduct() {
        return this.model.find({
            productCategory: products_model_1.ProductCategory.FOOD
        });
    }
    async getProductDetail(id) {
        const product = await this.model.findById(id).exec();
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(products_model_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map