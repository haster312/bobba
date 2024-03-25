import { Injectable } from "@nestjs/common";
import { Twilio } from "twilio";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TwilioService {
	private readonly client: Twilio;
	private readonly basePhone: string;

	constructor(private configService: ConfigService) {
		this.client = new Twilio(
			this.configService.get<string>("TWILIO_ACCOUNT_SID"),
			this.configService.get<string>("TWILIO_AUTH_TOKEN"),
		);
		this.basePhone = this.configService.get<string>("TWILIO_PHONE_NUMBER");
	}

	async sendVerifySMS(verifyToken: string, phoneNumber: string) {
		return new Promise((resolve, reject) => {
			this.client.messages
				.create({
					body: `You have requested to sign Bobba App. Verify token is ${verifyToken}`,
					from: this.basePhone,
					to: phoneNumber,
				})
				.then((message) => resolve(message))
				.catch((error) => reject(error));
		});
	}
}
