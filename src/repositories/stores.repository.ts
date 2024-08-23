import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {BaseRepository} from "./base.repository";
import {Store} from "../models/stores.model";
import {LocationRadius} from "../validator/LocationRadius";

@Injectable()
export class StoresRepository extends BaseRepository<Store> {
	constructor(
		@InjectModel(Store.name)
		private storeRepository: Model<Store>,
	) {
		super(storeRepository);
	}

	async findAllSTore() {
		return this.model.find().populate('hours').exec();
	}

	async findStoreByRadius({ lat, long, radius = 5 }: LocationRadius): Promise<Store[]>{
		return this.model.find({
			geometry: {
				$near: {
					$geometry: { type: "Point",  coordinates: [ long, lat ] },
					$maxDistance: radius * 1000
				}
			}
		}).populate('hours').exec();
	}

	async findStoreByCountryCode(countryCode: string): Promise<Store[]> {
		return this.model.find({
			countryCode: countryCode
		}).populate('hours').sort({ stateName: 1 }).exec();
	}

	async createStoreData(storeData): Promise<Store> {
		return this.create({
			storeNumber: parseInt(storeData.id, 10),
			storeName: storeData.store,
			storeAddress: storeData.address,
			city: storeData.city,
			state: storeData.state,
			postalCode: parseInt(storeData.zip),
			countryCode: storeData.countryCode,
			lat: parseFloat(storeData.lat),
			long: parseFloat(storeData.lng),
			country: storeData.country,
			phone: storeData.phone,
			fax: storeData.fax,
			email: storeData.email,
			hours: storeData.hours,
			url: storeData.url,
			geometry: {
				type: 'Point',
				coordinates: [parseFloat(storeData.lng), parseFloat(storeData.lat)],
			},
		});
	}

}
