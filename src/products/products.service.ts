import {Injectable, OnModuleInit} from '@nestjs/common';
import {ProductsRepository} from "../repositories/products.repository";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class ProductsService implements OnModuleInit {
    constructor(public productRepository: ProductsRepository) {

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
        const product = await this.productRepository.findOneByCondition({});
        if (!product) {
            await this.initProduct();
        }
    }
}
