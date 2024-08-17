import {Injectable} from "@nestjs/common";
import {BaseRepository} from "./base.repository";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {State} from "../models/state.model";

@Injectable()
export class StateRepository extends BaseRepository<State> {
    constructor(
        @InjectModel(State.name)
        private StateRepository: Model<State>,
    ) {
        super(StateRepository);
    }

    async createState(stateInfo) {
        return this.create(stateInfo);
    }

    async findAllStates(): Promise<State[]> {
        return this.model.find().sort({ stateName: 1 }).exec();
    }

    async findByCountryCode(countryCode: string): Promise<State[]> {
        return this.model.find({ countryCode }).sort({ stateName: 1 }).exec();
    }
}