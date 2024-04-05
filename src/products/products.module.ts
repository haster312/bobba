import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {MongooseModule} from "@nestjs/mongoose";
import { Product, ProductsModel } from "../models/products.model";
import {ProductsRepository} from "../repositories/products.repository";

@Module({
    imports: [
      MongooseModule.forFeature([{ name: Product.name, schema: ProductsModel }])
    ],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository],
    exports: [ProductsService, ProductsRepository]
})
export class ProductsModule {}
