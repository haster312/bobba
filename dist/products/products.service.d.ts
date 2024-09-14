import { ProductsRepository } from "../repositories/products.repository";
import { AddonRepository } from "../repositories/addon.repository";
import { AddonType } from "../models/addon.model";
import { Product } from "../models/products.model";
export declare class ProductsService {
    productRepository: ProductsRepository;
    addonRepository: AddonRepository;
    constructor(productRepository: ProductsRepository, addonRepository: AddonRepository);
    initProduct(): Promise<void>;
    migrate(): Promise<void>;
    initAddon(type?: AddonType): Promise<void>;
    getAllProducts(): Promise<Product[]>;
    getAllDrink(): Promise<Product[]>;
    getAllFood(): Promise<Product[]>;
    getProductAddon(products: Product[]): Promise<Product[]>;
}
