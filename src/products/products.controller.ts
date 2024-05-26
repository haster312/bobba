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
    async getAllStores(@Req() req, @Res() res) {
        try {
            let products = await this.productsService.productRepository.findAll();
            const addonGroup = await this.productsService.addonRepository.getAddonGroupByType();
            products = products.map(product => {
                if (product.hasFlavor > 0) {
                    product.set(AddonType.FLAVOR, addonGroup[AddonType.FLAVOR]);
                }

                if (product.hasCondiment > 0) {
                    product.set(AddonType.CONDIMENT, addonGroup[AddonType.CONDIMENT]);
                }

                if (product.hasTopping > 0) {
                    product.set(AddonType.TOPPING, addonGroup[AddonType.TOPPING]);
                }

                if (product.hasBase > 0) {
                    product.set(AddonType.BASE, addonGroup[AddonType.BASE]);
                }

                return product;
            });

            return res.status(HttpStatus.OK).send(products);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
        }
    }
}
