import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repository";
import { Store } from "../models/stores.model";

@Injectable()
export class StoresRepository extends BaseRepository<Store> {
	constructor(
		@InjectModel(Store.name)
		private storeRepository: Model<Store>,
	) {
		super(storeRepository);
	}
}
