import {Injectable, OnModuleInit} from '@nestjs/common';
import {ProductsRepository} from "../repositories/products.repository";
import * as fs from "fs";
import * as path from "path";
import {AddonRepository} from "../repositories/addon.repository";
import {AddonType} from "../models/addon.model";
import {Product, ProductCategory} from "../models/products.model";

@Injectable()
export class ProductsService {
    constructor(
        public productRepository: ProductsRepository,
        public addonRepository: AddonRepository
    ) {

    }
    async initProduct() {
        const storeBuffer = fs.readFileSync(path.resolve( "./src/data/products.json"));
        if (storeBuffer) {
            const products = storeBuffer.toString("utf-8");
            for (let product of JSON.parse(products)) {
                await this.productRepository.create(product);
            }
        }
    }

    async migrate() {
        for (let value of Object.values(AddonType)) {
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

    async initAddon(type: AddonType = AddonType.TOPPING) {
        let file = null;
        // Insert topping
        switch (type) {
            case AddonType.BASE:
                break;
            case AddonType.TOPPING:
                file = "topping";
                break;
            case AddonType.FLAVOR:
                file = "flavor";
                break;
            case AddonType.CONDIMENT:
                file = "condiment";
                break;
        }
        if (file) {
            const buffer = fs.readFileSync(path.resolve( "./src/data/" + file +".json"));
            if (buffer) {
                const addons = buffer.toString("utf-8");
                for (let addon of JSON.parse(addons)) {
                    let price = addon.price ? addon.price : null;
                    let addonCategory = addon.category.trim();

                    let category = addonCategory === 'drink' ? ProductCategory.DRINK : ProductCategory.FOOD;
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

    async getProductDetail(id: string) {
        const product = await this.productRepository.getProductDetail(id);
        const addonGroup = await this.addonRepository.getAddonGroupByType();

        return this.applyProductAddon(product, addonGroup);
    }

    async getAllDrink() {
        let products = await this.productRepository.getDrinkProduct();

        return this.getProductAddon(products);
    }

    async getAllFood() {
        let products = await this.productRepository.getFoodProduct();

        return this.getProductAddon(products);
    }

    async getProductAddon(products: Product []) {
        const addonGroup = await this.addonRepository.getAddonGroupByType();

        products = products.map((product) => {
            product = this.applyProductAddon(product, addonGroup);

            return product;
        });

        return products;
    }

    applyProductAddon(product: Product, addonGroup: {}) {
        if (product.hasFlavor > 0) {
            product[AddonType.FLAVOR] = addonGroup[AddonType.FLAVOR];
        }

        if (product.hasCondiment > 0) {
            product[AddonType.CONDIMENT] = addonGroup[AddonType.CONDIMENT];
        }

        if (product.hasTopping > 0) {
            product[AddonType.TOPPING] = addonGroup[AddonType.TOPPING];
        }

        if (product.hasBase > 0) {
            product[AddonType.BASE] = addonGroup[AddonType.BASE];
        }


        return product;
    }
}
