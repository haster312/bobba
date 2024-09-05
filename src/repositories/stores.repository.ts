import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {BaseRepository} from "./base.repository";
import {Store} from "../models/stores.model";
import {LocationRadius} from "../validator/LocationRadius";
import * as dayjs from "dayjs";

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

	async findStoreByRadius({ state = null }): Promise<Store[]>{
		let query: Record<string, any> = {
			stateName: state,
		};

		// Fetch paginated results
		const results = await this.model
			.find(query)
			.populate('hours')
			.exec();

		return results;
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
			countryCode: storeData.countryCode,
			country: storeData.country,
			state: storeData.state,
			stateName: storeData.stateName,
			postalCode: parseInt(storeData.zip),
			lat: parseFloat(storeData.lat),
			long: parseFloat(storeData.lng),
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

	async findStoreWithId(id): Promise<Store> {
		return this.model.findOne({
			_id: id
		}).populate('hours').exec();
	}
}
