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
let StoresService = class StoresService {
    constructor(storeRepository) {
        this.storeRepository = storeRepository;
    }
    async initStore() {
        const storeBuffer = fs.readFileSync(path.resolve("./src/data/stores.json"));
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
    async onModuleInit() {
        const store = await this.storeRepository.findOneByCondition({});
        if (!store) {
            await this.initStore();
            console.info("Init stores data");
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
            };
        }
        return null;
    }
};
exports.StoresService = StoresService;
exports.StoresService = StoresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [stores_repository_1.StoresRepository])
], StoresService);
//# sourceMappingURL=stores.service.js.map