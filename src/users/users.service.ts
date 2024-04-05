import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../repositories/users.repository";
import { User } from "../models/users.model";

@Injectable()
export class UsersService {
	constructor(public usersRepository: UsersRepository) {}

	async verifyPhoneToken(validatePhoneToken) {
		return await this.usersRepository.findOneByCondition(
			validatePhoneToken,
		);
	}

	async generatePhoneToken(phoneNumber: string) {
		let user = await this.usersRepository.findOneByCondition({
			phoneNumber,
		});
		if (!user) {
			user = await this.usersRepository.create({ phoneNumber });
		}

		user.verifyToken = await this.generateTokenAndCheck();
		user = await this.usersRepository.update(user._id, user);

		return user;
	}

	async generateTokenAndCheck() {
		const n = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
		const verifyToken = n.toString().padStart(6, "0");
		const checkUser = await this.usersRepository.findOneByCondition({
			verifyToken,
		});
		if (!checkUser) {
			return verifyToken;
		}

		return this.generateTokenAndCheck();
	}

	async clearVerityToken(user: User) {
		return this.usersRepository.update(user._id, user);
	}
}
