import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "../models/user.model";
import { JwtService } from "@nestjs/jwt";
import { TwilioService } from "../twilio/twilio.service";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private twilioService: TwilioService,
	) {}

	async validatePhoneToken(validatePhoneToken): Promise<string> {
		const user =
			await this.usersService.verifyPhoneToken(validatePhoneToken);
		let accessToken = "";
		if (!user) {
			return accessToken;
		}

		accessToken = await this.jwtService.signAsync({
			id: user._id,
			phoneNumber: user.phoneNumber,
			googleToken: user.googleToken,
			appleToken: user.appleToken,
		});

		// Clear verifyToken
		user.verifyToken = null;
		await this.usersService.clearVerityToken(user);

		return accessToken;
	}

	async sendPhoneToken(phoneNumber): Promise<User> {
		const user = await this.usersService.generatePhoneToken(phoneNumber);

		// Send verify token
		await this.twilioService.sendVerifySMS(
			user.verifyToken,
			user.phoneNumber,
		);

		return user;
	}

	// Implement validate google & apple token
}
