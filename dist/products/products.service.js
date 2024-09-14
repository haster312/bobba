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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products_repository_1 = require("../repositories/products.repository");
const fs = require("fs");
const path = require("path");
const addon_repository_1 = require("../repositories/addon.repository");
const addon_model_1 = require("../models/addon.model");
const products_model_1 = require("../models/products.model");
let ProductsService = class ProductsService {
    constructor(productRepository, addonRepository) {
        this.productRepository = productRepository;
        this.addonRepository = addonRepository;
    }
    async initProduct() {
        const storeBuffer = fs.readFileSync(path.resolve("./src/data/products.json"));
        if (storeBuffer) {
            const products = storeBuffer.toString("utf-8");
            for (let product of JSON.parse(products)) {
                await this.productRepository.create(product);
            }
        }
    }
    async migrate() {
        for (let value of Object.values(addon_model_1.AddonType)) {
            if (typeof value == "string") {
                const addons = await this.addonRepository.findOneByCondition({ type: value });
                if (!addons) {
                    await this.initAddon(value);
                }
            }
        }
        const product = await this.productRepository.findOneByCondition({});
        if (!product) {
            await this.initProduct();
        }
    }
    async initAddon(type = addon_model_1.AddonType.TOPPING) {
        let file = null;
        switch (type) {
            case addon_model_1.AddonType.BASE:
                break;
            case addon_model_1.AddonType.TOPPING:
                file = "topping";
                break;
            case addon_model_1.AddonType.FLAVOR:
                file = "flavor";
                break;
            case addon_model_1.AddonType.CONDIMENT:
                file = "condiment";
                break;
        }
        if (file) {
            const buffer = fs.readFileSync(path.resolve("./src/data/" + file + ".json"));
            if (buffer) {
                const addons = buffer.toString("utf-8");
                for (let addon of JSON.parse(addons)) {
                    let price = addon.price ? addon.price : null;
                    let addonCategory = addon.category.trim();
                    let category = addonCategory === 'drink' ? products_model_1.ProductCategory.DRINK : products_model_1.ProductCategory.FOOD;
                    console.log(addon);
                    await this.addonRepository.create({
                        name: addon.name.trim(),
                        price,
                        type: type,
                        category,
                    });
                }
            }
        }
    }
    async getAllProducts() {
        let products = await this.productRepository.findAll();
        return this.getProductAddon(products);
    }
    async getAllDrink() {
        let products = await this.productRepository.getDrinkProduct();
        return this.getProductAddon(products);
    }
    async getAllFood() {
        let products = await this.productRepository.getFoodProduct();
        return this.getProductAddon(products);
    }
    async getProductAddon(products) {
        const addonGroup = await this.addonRepository.getAddonGroupByType();
        products = products.map((product) => {
            if (product.hasFlavor > 0) {
                product[addon_model_1.AddonType.FLAVOR] = addonGroup[addon_model_1.AddonType.FLAVOR];
            }
            if (product.hasCondiment > 0) {
                product[addon_model_1.AddonType.CONDIMENT] = addonGroup[addon_model_1.AddonType.CONDIMENT];
            }
            if (product.hasTopping > 0) {
                product[addon_model_1.AddonType.TOPPING] = addonGroup[addon_model_1.AddonType.TOPPING];
            }
            if (product.hasBase > 0) {
                product[addon_model_1.AddonType.BASE] = addonGroup[addon_model_1.AddonType.BASE];
            }
            return product;
        });
        return products;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_repository_1.ProductsRepository,
        addon_repository_1.AddonRepository])
], ProductsService);
//# sourceMappingURL=products.service.js.map