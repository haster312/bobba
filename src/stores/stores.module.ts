import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { Store, StoresModel } from "../models/stores.model";
import { StoresRepository } from "../repositories/stores.repository";
import { StoresService } from "./stores.service";
import { StoresController } from "./stores.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Store.name, schema: StoresModel }])
    ],
    controllers: [StoresController],
    providers: [StoresService, StoresRepository],
    exports: [StoresService, StoresRepository]
})
export class StoresModule {}
