import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Collection, Model} from "mongoose";
import { BaseRepository } from "./base.repository";
import { Store } from "../models/stores.model";
import {LocationRadius} from "../validator/LocationRadius";

@Injectable()
export class StoresRepository extends BaseRepository<Store> {
	constructor(
		@InjectModel(Store.name)
		private storeRepository: Model<Store>,
	) {
		super(storeRepository);
	}

	async findStoreByRadius({ lat, long, distance }: LocationRadius): Promise<Store[]>{
		return this.model.find({
			geometry: {
				$near: {
					$geometry: { type: "Point",  coordinates: [ long, lat ] },
					$maxDistance: distance * 1000
				}
			}
		})
	}

	async findStoreByCountryCode(countryCode: string): Promise<Store[]> {
		return this.model.find({
			countryCode: countryCode
		}).sort({ stateName: 1 }).exec();
	}
}
