import {
	Body,
	Controller,
	Post,
	HttpCode,
	HttpStatus,
	Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GetPhoneToken } from "../validator/GetPhoneToken";
import { ValidatePhoneToken } from "../validator/ValidatePhoneToken";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post("phone/verify")
	async validatePhoneToken(
		@Body() validatePhoneToken: ValidatePhoneToken,
		@Res() res,
	) {
		const token =
			await this.authService.validatePhoneToken(validatePhoneToken);
		if (token === "") {
			return res
				.status(HttpStatus.BAD_REQUEST)
				.send({ message: "Verify token is not valid" });
		}

		return res.status(HttpStatus.OK).send({ token: token });
	}

	@HttpCode(HttpStatus.OK)
	@Post("phone/token")
	async getPhoneToken(@Body() getPhoneToken: GetPhoneToken, @Res() res) {
		try {
			const phoneNumber: string = getPhoneToken.phoneNumber;

			const user = await this.authService.sendPhoneToken(phoneNumber);

			return res
				.status(HttpStatus.OK)
				.send({ verifyToken: user.verifyToken });
		} catch (e) {
			return res
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.send({ message: e.message });
		}
	}
}
