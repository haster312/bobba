import { Controller, Get, UseGuards, Post, Request, Response } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiKeyGuard } from "./guards/api-key.guard";
import {StoresService} from "./stores/stores.service";
import {ProductsService} from "./products/products.service";

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private storeService: StoresService,
        private productService: ProductsService,
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @UseGuards(ApiKeyGuard)
    @Post('/migration')
    async migrationData(@Request() req, @Response() res) {
        if (req.body.onlyStore) {
            await this.storeService.insertStoreByJson();
        } else {
            await this.storeService.migrate();
            await this.productService.migrate();
        }

        return res.status(200).json({ success: true });
    }
}
