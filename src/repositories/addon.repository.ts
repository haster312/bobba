import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repository";
import { Addon } from "../models/addon.model";

@Injectable()
export class AddonRepository extends BaseRepository<Addon> {
    constructor(
        @InjectModel(Addon.name)
        private addonRepository: Model<Addon>,
    ) {
        super(addonRepository);
    }
}
