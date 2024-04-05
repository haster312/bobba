import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Res,
    Req,
    Get,
    UseGuards,
    Post,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController  {
    constructor(private productsService: ProductsService) {}

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get("/")
    async getAllStores(@Req() req, @Res() res) {
        try {
            const products = await this.productsService.productRepository.findAll();

            return res.status(HttpStatus.OK).send({ products });
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
        }
    }
}
