import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {StoreHour} from "../models/store-hour.model";
import {Store} from "../models/stores.model";

@Injectable()
export class StoreHourRepository extends BaseRepository<StoreHour> {
    constructor(
        @InjectModel(StoreHour.name)
        private storeHourRepository: Model<StoreHour>,
    ) {
        super(storeHourRepository);
    }

    async createStoreHourData(store: Store, storeHours: { day: string, close: string, open: string }[]): Promise<StoreHour[]> {
        const hours: StoreHour[] = [];

        for (const hour of storeHours) {
            const storeHour = await this.create({
                storeId: store._id,
                day: hour.day,
                open: hour.open,
                close: hour.close,
            })

            hours.push(storeHour);
        }

        return hours;
    }
}