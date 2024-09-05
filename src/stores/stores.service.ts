import {Injectable} from '@nestjs/common'
import * as path from "path";
import * as fs from "fs";
import {StoresRepository} from "../repositories/stores.repository";
import Axios from "axios";
import {StoreHourRepository} from "../repositories/store-hour.repository";
import {StateRepository} from "../repositories/state.repository";
import {LocationRadius} from "../validator/LocationRadius";
import * as dayjs from "dayjs";
import {Store} from "../models/stores.model";

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

    async insertStoreByJson() {
        const stateBuffer = fs.readFileSync(path.resolve( "./src/data/bobba.stores.json"));
        const storeHourBuffer = fs.readFileSync(path.resolve("./src/data/stores.json"))
        if (stateBuffer) {
            const stores = stateBuffer.toString("utf-8");
            let storeHours = storeHourBuffer.toString("utf-8");
            const hours: [] = JSON.parse(storeHours);

            for (const store of JSON.parse(stores)) {
                delete store._id;
                delete store.createdAt;
                delete store.updatedAt;
                const storeModel = await this.storeRepository.create(store);
                if (storeModel) {
                    const storeHour = hours.find((hour) => {
                        // @ts-ignore
                        return hour.store === store.storeName;
                    });

                    // @ts-ignore
                    await this.storeHourRepository.createStoreHourData(storeModel, storeHour.hours);
                }
            }
        }
    }

    async getStateByCountry(countryCode: string | null) {
        if (countryCode) {
            return this.stateRepository.findByCountryCode(countryCode.toUpperCase());
        }

        return this.stateRepository.findAllStates();
    }

    toRadians(degrees: number) {
        return (degrees * Math.PI) / 180;
    }

    getDistance(lat1: number, long1: number, lat2: number, long2: number): number {
        const earthRadiusInMeters = 6378100;
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(long2 - long1);

        const radLat1 = this.toRadians(lat1);
        const radLat2 = this.toRadians(lat2);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadiusInMeters * c; // Distance in meters
    }

    async getStoreByRadiusAndDistance({ state, lat, long, limit = 10, radius = 5, page, is_open }: LocationRadius) {
        let results = await this.storeRepository.findStoreByRadius({ state });
        const currentDate = dayjs().format('dddd');
        const currentTime = dayjs().format('HH:mm');
        if (is_open == 'true') {
            results = results.filter((store: Store) => {
                let validHour = true;
                const hours = store.hours;
                const hour = hours.find((hour) => {
                    return hour.day === currentDate;
                });

                if (hour === undefined) {
                    return false;
                }

                if (hour.open === "Closed") {
                    validHour = false;
                } else {
                    validHour = hour.open <= currentTime && hour.close >= currentTime;
                }

                return validHour;
            });
        }

        if (lat !== undefined && long !== undefined) {
            const lat1 = lat;
            const long1 = long;
            radius = radius * 1000;

            // Calculate distance
            results = results.map((store) => {
                const storeObject = JSON.parse(JSON.stringify(store));
                if (storeObject.lat && storeObject.long) {
                    storeObject.distance = this.getDistance(lat1, long1, storeObject.lat, storeObject.long);
                    storeObject.distance = (storeObject.distance / 1000).toFixed(2);
                }

                return storeObject;
            });

            // Filter by radius
            results = results.filter((store) => {
                return store.distance <= radius;
            });
        }

        const total = results.length;
        const pages = Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = Math.min(startIndex + limit, total);
        const paginatedResults = results.slice(startIndex, endIndex);

        return { results: paginatedResults, total, pages };
    }
}
