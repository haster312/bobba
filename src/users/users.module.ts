import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRepository } from "../repositories/users.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserModel } from "../models/user.model";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserModel }])
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UsersService, UsersRepository]
})
export class UsersModule {}
