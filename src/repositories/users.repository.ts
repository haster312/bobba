import { User } from "../models/users.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repository";

@Injectable()
export class UsersRepository extends BaseRepository<User> {
	constructor(
		@InjectModel(User.name)
		private userRepository: Model<User>,
	) {
		super(userRepository);
	}

	async deleteUser(user: User) {
		return this.model.findByIdAndDelete(user._id);
	}
}
