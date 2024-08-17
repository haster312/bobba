import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { Store, StoresModel } from "../models/stores.model";
import { StoresRepository } from "../repositories/stores.repository";
import { StoresService } from "./stores.service";
import { StoresController } from "./stores.controller";
import {StateRepository} from "../repositories/state.repository";
import {StoreHourRepository} from "../repositories/store-hour.repository";
import {State, StateModel} from "../models/state.model";
import {StoreHour, StoreHourModel} from "../models/store-hour.model";
import {StateController} from "./state.controller";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Store.name, schema: StoresModel },
            { name: State.name, schema: StateModel },
            { name: StoreHour.name, schema: StoreHourModel },
        ])
    ],
    controllers: [StoresController, StateController],
    providers: [StoresService, StoresRepository, StateRepository, StoreHourRepository],
    exports: [StoresService, StoresRepository]
})
export class StoresModule {}
