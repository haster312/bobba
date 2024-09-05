import { ProductsRepository } from "../repositories/products.repository";
import { AddonRepository } from "../repositories/addon.repository";
import { AddonType } from "../models/addon.model";
export declare class ProductsService {
    productRepository: ProductsRepository;
    addonRepository: AddonRepository;
    constructor(productRepository: ProductsRepository, addonRepository: AddonRepository);
    initProduct(): Promise<void>;
    migrate(): Promise<void>;
    initAddon(type?: AddonType): Promise<void>;
}
