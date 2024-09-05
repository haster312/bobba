import { ProductsService } from "./products.service";
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    getAllStores(req: any, res: any): Promise<any>;
}
