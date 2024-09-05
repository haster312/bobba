"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresService = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
const stores_repository_1 = require("../repositories/stores.repository");
const axios_1 = require("axios");
const store_hour_repository_1 = require("../repositories/store-hour.repository");
const state_repository_1 = require("../repositories/state.repository");
const dayjs = require("dayjs");
let StoresService = class StoresService {
    constructor(storeRepository, storeHourRepository, stateRepository) {
        this.storeRepository = storeRepository;
        this.storeHourRepository = storeHourRepository;
        this.stateRepository = stateRepository;
    }
    async initStore() {
        const storeBuffer = fs.readFileSync(path.resolve("./src/data/stores.json"));
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
    async loadLocation(address, lat, long) {
        const query = encodeURIComponent(address);
        const apiKey = "n3ARgYmQiPD3Jx2lODxz9n0nywRqOjep";
        const url = `https://api.tomtom.com/search/2/geocode/${query}.json?key=${apiKey}&lat=${lat}&lon=${long}`;
        const response = await axios_1.default.get(url);
        if (response.status == 200) {
            const storeData = response.data.results;
            if (storeData.length === 0)
                return {};
            const address = storeData[0].address;
            return {
                countryCode: address.countryCode,
                country: address.country,
                state: address.countrySubdivision,
                stateName: address.countrySubdivisionName,
            };
        }
        return null;
    }
    async initState() {
        const stateBuffer = fs.readFileSync(path.resolve("./src/data/states.json"));
        if (stateBuffer) {
            const states = stateBuffer.toString("utf-8");
            for (const stateInfo of JSON.parse(states)) {
                await this.stateRepository.createState(stateInfo);
            }
        }
    }
    async insertStoreByJson() {
        const stateBuffer = fs.readFileSync(path.resolve("./src/data/bobba.stores.json"));
        const storeHourBuffer = fs.readFileSync(path.resolve("./src/data/stores.json"));
        if (stateBuffer) {
            const stores = stateBuffer.toString("utf-8");
            let storeHours = storeHourBuffer.toString("utf-8");
            const hours = JSON.parse(storeHours);
            for (const store of JSON.parse(stores)) {
                delete store._id;
                delete store.createdAt;
                delete store.updatedAt;
                const storeModel = await this.storeRepository.create(store);
                if (storeModel) {
                    const storeHour = hours.find((hour) => {
                        return hour.store === store.storeName;
                    });
                    await this.storeHourRepository.createStoreHourData(storeModel, storeHour.hours);
                }
            }
        }
    }
    async getStateByCountry(countryCode) {
        if (countryCode) {
            return this.stateRepository.findByCountryCode(countryCode.toUpperCase());
        }
        return this.stateRepository.findAllStates();
    }
    toRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }
    getDistance(lat1, long1, lat2, long2) {
        const earthRadiusInMeters = 6378100;
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(long2 - long1);
        const radLat1 = this.toRadians(lat1);
        const radLat2 = this.toRadians(lat2);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return earthRadiusInMeters * c;
    }
    async getStoreByRadiusAndDistance({ state, lat, long, limit = 10, radius = 5, page, is_open }) {
        let results = await this.storeRepository.findStoreByRadius({ state });
        const currentDate = dayjs().format('dddd');
        const currentTime = dayjs().format('HH:mm');
        if (is_open == 'true') {
            results = results.filter((store) => {
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
                }
                else {
                    validHour = hour.open <= currentTime && hour.close >= currentTime;
                }
                return validHour;
            });
        }
        if (lat !== undefined && long !== undefined) {
            const lat1 = lat;
            const long1 = long;
            radius = radius * 1000;
            results = results.map((store) => {
                const storeObject = JSON.parse(JSON.stringify(store));
                if (storeObject.lat && storeObject.long) {
                    storeObject.distance = this.getDistance(lat1, long1, storeObject.lat, storeObject.long);
                    storeObject.distance = (storeObject.distance / 1000).toFixed(2);
                }
                return storeObject;
            });
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
};
exports.StoresService = StoresService;
exports.StoresService = StoresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [stores_repository_1.StoresRepository,
        store_hour_repository_1.StoreHourRepository,
        state_repository_1.StateRepository])
], StoresService);
//# sourceMappingURL=stores.service.js.map