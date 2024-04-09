import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductsModel } from "../models/products.model";
import { Addon, AddonModel } from "../models/addon.model";
import { ProductsRepository } from "../repositories/products.repository";
import { AddonRepository } from "../repositories/addon.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Product.name, schema: ProductsModel }]),
        MongooseModule.forFeature([{ name: Addon.name, schema: AddonModel }])
    ],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository, AddonRepository],
    exports: [ProductsService, ProductsRepository, AddonRepository]
})
export class ProductsModule {}
