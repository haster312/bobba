"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const auth_service_1 = require("./auth/auth.service");
const auth_module_1 = require("./auth/auth.module");
const configuration_1 = require("./config/configuration");
const config_1 = require("@nestjs/config");
const mongodb_1 = require("./config/database/mongodb");
const users_service_1 = require("./users/users.service");
const jwt_1 = require("@nestjs/jwt");
const twilio_service_1 = require("./twilio/twilio.service");
const stores_module_1 = require("./stores/stores.module");
const products_module_1 = require("./products/products.module");
const common_module_1 = require("./common/common.module");
const orders_module_1 = require("./orders/orders.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ load: [configuration_1.default] }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            mongodb_1.default,
            stores_module_1.StoresModule,
            products_module_1.ProductsModule,
            common_module_1.CommonModule,
            orders_module_1.OrdersModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            auth_service_1.AuthService,
            users_service_1.UsersService,
            jwt_1.JwtService,
            twilio_service_1.TwilioService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map