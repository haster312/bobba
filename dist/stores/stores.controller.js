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
exports.StoresController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth-guard");
const stores_service_1 = require("./stores.service");
const LocationRadius_1 = require("../validator/LocationRadius");
const CountryCode_1 = require("../validator/CountryCode");
let StoresController = class StoresController {
    constructor(storeService) {
        this.storeService = storeService;
    }
    async getAllStores(locationRadius, req, res) {
        try {
            let stores;
            if (locationRadius.lat && locationRadius.long) {
                const { results } = await this.storeService.storeRepository.findStoreByRadius(locationRadius);
                if (results.length == 0) {
                    return res.status(common_1.HttpStatus.BAD_REQUEST).send({
                        message: "Cannot find any store, increase distance"
                    });
                }
            }
            else {
                stores = await this.storeService.storeRepository.findAllSTore();
            }
            return res.status(common_1.HttpStatus.OK).send(stores);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
        }
    }
    async getStoreByLocation(locationRadius, req, res) {
        try {
            const { results, total, pages } = await this.storeService.storeRepository.findStoreByRadius(locationRadius);
            return res.status(common_1.HttpStatus.OK).json({
                items: results,
                page: locationRadius.page,
                total,
                pages,
            });
        }
        catch (e) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
        }
    }
    async getStoreByState(countryCode, req, res) {
        try {
            const results = await this.storeService.storeRepository.findStoreByCountryCode(countryCode.countryCode);
            if (results.length == 0) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).send({
                    message: "Cannot get lit stores for current country"
                });
            }
            let stores = {};
            results.map(result => {
                if (!(result.stateName in stores)) {
                    stores[result.stateName] = [];
                }
                stores[result.stateName].push(result);
            });
            return res.status(common_1.HttpStatus.OK).send(stores);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
        }
    }
    async getStoreDetail(param, req, res) {
        try {
            const { id } = param;
            const result = await this.storeService.storeRepository.findStoreWithId(id);
            if (!result) {
                res.status(common_1.HttpStatus.NOT_FOUND).send({ message: "Not found" });
            }
            return res.status(common_1.HttpStatus.OK).send(result);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
        }
    }
};
exports.StoresController = StoresController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)("/"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LocationRadius_1.LocationRadius, Object, Object]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "getAllStores", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)("/radius"),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LocationRadius_1.LocationRadius, Object, Object]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "getStoreByLocation", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)("/state"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CountryCode_1.CountryCode, Object, Object]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "getStoreByState", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)("/detail/:id"),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], StoresController.prototype, "getStoreDetail", null);
exports.StoresController = StoresController = __decorate([
    (0, common_1.Controller)('stores'),
    __metadata("design:paramtypes", [stores_service_1.StoresService])
], StoresController);
//# sourceMappingURL=stores.controller.js.map