import { OnModuleInit } from '@nestjs/common';
import { ProductsRepository } from "../repositories/products.repository";
import { AddonRepository } from "../repositories/addon.repository";
import { AddonType } from "../models/addon.model";
export declare class ProductsService implements OnModuleInit {
    productRepository: ProductsRepository;
    addonRepository: AddonRepository;
    constructor(productRepository: ProductsRepository, addonRepository: AddonRepository);
    initProduct(): Promise<void>;
    onModuleInit(): Promise<void>;
    initAddon(type?: AddonType): Promise<void>;
}
