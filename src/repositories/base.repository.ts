import { BaseRepositoryInterface } from "./base.interface";
import { Model } from "mongoose";

export class BaseRepository<T> implements BaseRepositoryInterface<T> {
	private model: Model<T>;
	constructor(model: Model<T>) {
		this.model = model;
	}

	async create(item: any): Promise<T> {
		return this.model.create(item);
	}

	async update(_id: string, item: T | any): Promise<T> {
		return this.model.findByIdAndUpdate(_id, item, { new: true });
	}

	async findOneById(id: string): Promise<T> {
		return this.model.findById(id);
	}

	async findOneByCondition(condition: object): Promise<T> {
		return this.model.findOne({ ...condition }).exec();
	}

	async findAll() {
		return this.model.find().exec();
	}
}
