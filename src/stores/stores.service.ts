import { Injectable, OnModuleInit } from '@nestjs/common'
import * as path from "path";
import * as fs from "fs";
import { StoresRepository } from "../repositories/stores.repository";
import Axios from "axios";
import {urlencoded} from "express";
import {StoreHourRepository} from "../repositories/store-hour.repository";
import {StateRepository} from "../repositories/state.repository";

@Injectable()
export class StoresService {
    constructor(
        public storeRepository: StoresRepository,
        public storeHourRepository: StoreHourRepository,
        public stateRepository: StateRepository,
    ) {}

    async initStore() {
        const storeBuffer = fs.readFileSync(path.resolve( "./src/data/stores.json"));
        if (storeBuffer) {
            const stores = storeBuffer.toString("utf-8");
            for (let store of JSON.parse(stores)) {
                const locationInfo = await this.loadLocation(store.address, store.lat, store.lng);
                if (locationInfo) {
                    store = { ...store, ...locationInfo };
                }
                const storeModel = await this.storeRepository.createStoreData(store);
                if (storeModel) {
                    await this.storeHourRepository.createStoreHourData(storeModel, store.hours);
                }
            }
        }
    }

    /**
     * Init stores for testing
     */
    async migrate() {
        const store = await this.storeRepository.findOneByCondition({});
        if (!store) {
            await this.initStore();
        }

        const state = await this.stateRepository.findOneByCondition({});

        if (!state) {
            await this.initState();
        }
    }

    async loadLocation(address: string, lat: number, long: number): Promise<Object> {
        const query = encodeURIComponent(address);
        const apiKey = "n3ARgYmQiPD3Jx2lODxz9n0nywRqOjep";
        const url = `https://api.tomtom.com/search/2/geocode/${query}.json?key=${apiKey}&lat=${lat}&lon=${long}`;
        const response = await Axios.get(url);

        if (response.status == 200) {
            const storeData = response.data.results;
            if (storeData.length === 0) return {};

            const address = storeData[0].address;
            return {
                countryCode: address.countryCode,
                country: address.country,
                state: address.countrySubdivision,
                stateName: address.countrySubdivisionName,
            }
        }

        return null;
    }

    async initState() {
        const stateBuffer = fs.readFileSync(path.resolve( "./src/data/states.json"));
        if (stateBuffer) {
            const states = stateBuffer.toString("utf-8");
            for (const stateInfo of JSON.parse(states)) {
                await this.stateRepository.createState(stateInfo);
            }
        }
    }

    async getStateByCountry(countryCode: string | null) {
        if (countryCode) {
            return this.stateRepository.findByCountryCode(countryCode.toUpperCase());
        }

        return this.stateRepository.findAllStates();
    }
}
