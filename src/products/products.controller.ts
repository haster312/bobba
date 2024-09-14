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
import {AddonType} from "../models/addon.model";

@Controller("products")
export class ProductsController  {
    constructor(private productsService: ProductsService) {}

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get("/")
    async getAllProducts(@Req() req, @Res() res) {
        try {
            let products = await this.productsService.productRepository.findAll();

            return res.status(HttpStatus.OK).send(products);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get("/drink")
    async getAllDrink(@Req() req, @Res() res) {
        try {
            let products = await this.productsService.getAllDrink();

            return res.status(HttpStatus.OK).send(products);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
        }
    }

    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Get("/food")
    async getAllFood(@Req() req, @Res() res) {
        try {
            let products = await this.productsService.getAllFood();

            return res.status(HttpStatus.OK).send(products);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
        }
    }
}
