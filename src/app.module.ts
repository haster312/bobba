import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthService } from "./auth/auth.service";
import { AuthModule } from "./auth/auth.module";
import configuration from "./config/configuration";
import { ConfigModule } from "@nestjs/config";
import mongodb from "./config/database/mongodb";
import { UsersService } from "./users/users.service";
import { JwtService } from "@nestjs/jwt";
import { TwilioService } from "./twilio/twilio.service";
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { StoresService } from './stores/stores.service';
import { StoresController } from './stores/stores.controller';
import { StoresModule } from './stores/stores.module';
import { ProductsModule } from './products/products.module';

@Module({
	imports: [
		ConfigModule.forRoot({ load: [configuration] }),
		UsersModule,
		AuthModule,
		mongodb,
		StoresModule,
		ProductsModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		AuthService,
		UsersService,
		JwtService,
		TwilioService,
	],
})
export class AppModule {}
