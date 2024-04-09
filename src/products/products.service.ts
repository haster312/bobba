import {Injectable, OnModuleInit} from '@nestjs/common';
import {ProductsRepository} from "../repositories/products.repository";
import * as fs from "fs";
import * as path from "path";
import {AddonRepository} from "../repositories/addon.repository";
import {AddonType} from "../models/addon.model";

@Injectable()
export class ProductsService implements OnModuleInit {
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

    async onModuleInit() {
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
                file = "flavors";
                break;
        }
        if (file) {
            const buffer = fs.readFileSync(path.resolve( "./src/data/" + file +".json"));
            if (buffer) {
                const addons = buffer.toString("utf-8");
                for (let addon of JSON.parse(addons)) {
                    let price = addon.price ? addon.price : null;

                    await this.addonRepository.create({
                        name: addon.name.trim(),
                        price,
                        type: type
                    });
                }
            }
        }
    }
}
