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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("./base.repository");
const stores_model_1 = require("../models/stores.model");
let StoresRepository = class StoresRepository extends base_repository_1.BaseRepository {
    constructor(storeRepository) {
        super(storeRepository);
        this.storeRepository = storeRepository;
    }
    async findAllSTore() {
        return this.model.find().populate('hours').exec();
    }
    async findStoreByRadius({ lat, long, distance }) {
        return this.model.find({
            geometry: {
                $near: {
                    $geometry: { type: "Point", coordinates: [long, lat] },
                    $maxDistance: distance * 1000
                }
            }
        }).populate('hours').exec();
    }
    async findStoreByCountryCode(countryCode) {
        return this.model.find({
            countryCode: countryCode
        }).populate('hours').sort({ stateName: 1 }).exec();
    }
    async createStoreData(storeData) {
        return this.create({
            storeNumber: parseInt(storeData.id, 10),
            storeName: storeData.store,
            storeAddress: storeData.address,
            city: storeData.city,
            state: storeData.state,
            postalCode: parseInt(storeData.zip),
            countryCode: storeData.countryCode,
            lat: parseFloat(storeData.lat),
            long: parseFloat(storeData.lng),
            country: storeData.country,
            phone: storeData.phone,
            fax: storeData.fax,
            email: storeData.email,
            hours: storeData.hours,
            url: storeData.url,
            geometry: {
                type: 'Point',
                coordinates: [parseFloat(storeData.lng), parseFloat(storeData.lat)],
            },
        });
    }
};
exports.StoresRepository = StoresRepository;
exports.StoresRepository = StoresRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(stores_model_1.Store.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StoresRepository);
//# sourceMappingURL=stores.repository.js.map