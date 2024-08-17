"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const stores_model_1 = require("../models/stores.model");
const stores_repository_1 = require("../repositories/stores.repository");
const stores_service_1 = require("./stores.service");
const stores_controller_1 = require("./stores.controller");
const state_repository_1 = require("../repositories/state.repository");
const store_hour_repository_1 = require("../repositories/store-hour.repository");
const state_model_1 = require("../models/state.model");
const store_hour_model_1 = require("../models/store-hour.model");
const state_controller_1 = require("./state.controller");
let StoresModule = class StoresModule {
};
exports.StoresModule = StoresModule;
exports.StoresModule = StoresModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: stores_model_1.Store.name, schema: stores_model_1.StoresModel },
                { name: state_model_1.State.name, schema: state_model_1.StateModel },
                { name: store_hour_model_1.StoreHour.name, schema: store_hour_model_1.StoreHourModel },
            ])
        ],
        controllers: [stores_controller_1.StoresController, state_controller_1.StateController],
        providers: [stores_service_1.StoresService, stores_repository_1.StoresRepository, state_repository_1.StateRepository, store_hour_repository_1.StoreHourRepository],
        exports: [stores_service_1.StoresService, stores_repository_1.StoresRepository]
    })
], StoresModule);
//# sourceMappingURL=stores.module.js.map