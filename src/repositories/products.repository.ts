import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repository";
import {Product, ProductCategory} from "../models/products.model";

@Injectable()
export class ProductsRepository extends BaseRepository<Product> {
	constructor(
		@InjectModel(Product.name)
		private productRepository: Model<Product>,
	) {
		super(productRepository);
	}

	async getDrinkProduct() {
		return this.model.find({
			productCategory: ProductCategory.DRINK
		})
	}

	async getFoodProduct() {
		return this.model.find({
			productCategory: ProductCategory.FOOD
		})
	}
}
