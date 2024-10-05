"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const S3Service_1 = require("./services/S3Service");
const upload_controller_1 = require("./controllers/upload.controller");
const config_1 = require("@nestjs/config");
const RabbitMQService_1 = require("./services/RabbitMQService");
const microservices_1 = require("@nestjs/microservices");
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            microservices_1.ClientsModule.registerAsync([
                {
                    imports: [config_1.ConfigModule],
                    name: 'RABBITMQ_SERVICE',
                    useFactory: async (configService) => {
                        return {
                            transport: microservices_1.Transport.RMQ,
                            options: {
                                urls: [configService.get('RABBIT_MQ').CONNECT_URI],
                                queue: configService.get('RABBIT_MQ').QUEUE,
                                queueOptions: {
                                    durable: false,
                                },
                            }
                        };
                    },
                    inject: [config_1.ConfigService],
                },
            ]),
        ],
        controllers: [upload_controller_1.UploadController],
        providers: [
            S3Service_1.S3Service,
            config_1.ConfigService,
            RabbitMQService_1.RabbitMQService
        ],
        exports: [S3Service_1.S3Service],
    })
], CommonModule);
//# sourceMappingURL=common.module.js.map