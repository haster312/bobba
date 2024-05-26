import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repository";
import {Addon, AddonType} from "../models/addon.model";

@Injectable()
export class AddonRepository extends BaseRepository<Addon> {
    constructor(
        @InjectModel(Addon.name)
        private addonRepository: Model<Addon>,
    ) {
        super(addonRepository);
    }

    async getAddonGroupByType(): Promise<{}> {
        const addons = await this.model.find().sort({ name: 1 });
        if (addons.length === 0) {
            return {};
        }

        const data = {};
        addons.map(addon => {
            if (!(addon.type in data)) {
                data[addon.type] = []
            }

            data[addon.type].push(addon);
        })

        return data;
    }
}
