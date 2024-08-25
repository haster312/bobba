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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const api_key_guard_1 = require("./guards/api-key.guard");
const stores_service_1 = require("./stores/stores.service");
const products_service_1 = require("./products/products.service");
let AppController = class AppController {
    constructor(appService, storeService, productService) {
        this.appService = appService;
        this.storeService = storeService;
        this.productService = productService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async migrationData(req, res) {
        if (req.body.onlyStore) {
            await this.storeService.insertStoreByJson();
        }
        else {
            await this.storeService.migrate();
            await this.productService.migrate();
        }
        return res.status(200).json({ success: true });
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    (0, common_1.Post)('/migration'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "migrationData", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        stores_service_1.StoresService,
        products_service_1.ProductsService])
], AppController);
//# sourceMappingURL=app.controller.js.map