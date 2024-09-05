import { AppService } from "./app.service";
import { StoresService } from "./stores/stores.service";
import { ProductsService } from "./products/products.service";
export declare class AppController {
    private readonly appService;
    private storeService;
    private productService;
    constructor(appService: AppService, storeService: StoresService, productService: ProductsService);
    getHello(): string;
    migrationData(req: any, res: any): Promise<any>;
}
