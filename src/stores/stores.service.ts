import { Injectable, OnModuleInit } from '@nestjs/common'
import * as path from "path";
import * as fs from "fs";
import { StoresRepository } from "../repositories/stores.repository";
import Axios from "axios";
import {urlencoded} from "express";

@Injectable()
export class StoresService implements OnModuleInit {
    constructor(public storeRepository: StoresRepository) {
    }
    async initStore() {
        const storeBuffer = fs.readFileSync(path.resolve( "./src/data/stores.json"));
        if (storeBuffer) {
            const stores = storeBuffer.toString("utf-8");
            for (let store of JSON.parse(stores)) {
                const location = await this.loadLocation(store.storeAddress, store.lat, store.long);
                await this.storeRepository.create({
                    ...store,
                    ...location
                });
            }
        }
    }

    /**
     * Init stores for testing
     */
    async onModuleInit() {
        const store = await this.storeRepository.findOneByCondition({});
        if (!store) {
            await this.initStore();
            console.info("Init stores data")
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
                postalCode: address.postalCode,
                countryCode: address.countryCode,
                country: address.country,
                city: address.municipality,
                state: address.countrySubdivision,
                stateName: address.countrySubdivisionName,
                geometry: {
                    type: "Point",
                    coordinates: [long, lat]
                }
            }
        }

        return null;
    }
}
