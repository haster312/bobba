import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Res,
	Req,
	Get,
	UseGuards,
	Post, Delete,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { UsersService } from "./users.service";
import { UserInfo } from "../validator/UserInfo";
import {AuthService} from "../auth/auth.service";
import {ValidateDeleteToken} from "../validator/ValidateDeleteToken";

@Controller("user")
export class UsersController {
	constructor(private usersService: UsersService, private authService: AuthService) {}

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

	@UseGuards(JwtAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Get("delete/request")
	async requestToDelete(@Req() req, @Res() res) {
		try {
			let user = await this.usersService.usersRepository.findOneById(
				req.user.id,
			);

			if (!user) {
				res.status(HttpStatus.NOT_FOUND).send({
					message: "User not found",
				});
			}

			user = await this.authService.sendDeleteToken(user.phoneNumber);

			return res.status(HttpStatus.OK).send({ deleteToken: user.deleteToken });
		} catch (e) {
			return res
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.send({ message: e.message });
		}
	}

	@UseGuards(JwtAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Delete("delete")
	async proceedDeleteUser(@Body() validateDeleteToken: ValidateDeleteToken,@Req() req, @Res() res) {
		try {
			let user = await this.usersService.usersRepository.findOneById(
				req.user.id,
			);

			if (!user) {
				res.status(HttpStatus.NOT_FOUND).send({
					message: "User not found",
				});
			}

			if (user.deleteToken !== validateDeleteToken.deleteToken) {
				return res.status(HttpStatus.BAD_REQUEST).send({ message: "Delete token is not correct!" });
			}

			const deleted = await this.usersService.deleteUser(user);

			return res.status(HttpStatus.OK).send({ deleted });
		} catch (e) {
			return res
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.send({ message: e.message });
		}
	}
}
