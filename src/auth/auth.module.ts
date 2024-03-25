import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TwilioService } from "../twilio/twilio.service";
import { JwtStrategy } from "./JwtStrategy";

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secretOrPrivateKey: configService.get("JWT_SECRET"),
				signOptions: {
					expiresIn: 3600 * 24 * 7,
				},
			}),
			inject: [ConfigService],
		}),
		ConfigModule,
	],
	providers: [AuthService, JwtStrategy, TwilioService],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {}
