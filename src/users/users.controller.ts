import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Res,
	Req,
	Get,
	UseGuards,
	Post,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { UsersService } from "./users.service";
import { UserInfo } from "../validator/UserInfo";

@Controller("user")
export class UsersController {
	constructor(private usersService: UsersService) {}

	@UseGuards(JwtAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Get("info")
	async getUserInfo(@Req() req, @Res() res) {
		const user = await this.usersService.usersRepository.findOneById(
			req.user.id,
		);

		if (!user) {
			res.status(HttpStatus.NOT_FOUND).send({
				message: "User not found",
			});
		}

		return res.status(HttpStatus.OK).send({ user });
	}

	@UseGuards(JwtAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post("info")
	async updateUserInfo(@Body() data: UserInfo, @Req() req, @Res() res) {
		try {
			let user = await this.usersService.usersRepository.findOneById(
				req.user.id,
			);

			if (!user) {
				res.status(HttpStatus.NOT_FOUND).send({
					message: "User not found",
				});
			}

			user = await this.usersService.usersRepository.update(
				user._id,
				data,
			);

			return res.status(HttpStatus.OK).send({ user });
		} catch (e) {
			return res
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.send({ message: e.message });
		}
	}
}
