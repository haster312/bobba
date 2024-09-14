import { ProductsService } from "./products.service";
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    getAllProducts(req: any, res: any): Promise<any>;
    getAllDrink(req: any, res: any): Promise<any>;
    getAllFood(req: any, res: any): Promise<any>;
}
