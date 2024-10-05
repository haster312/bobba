import {Module} from "@nestjs/common";
import {S3Service} from "./services/S3Service";
import {UploadController} from "./controllers/upload.controller";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { RabbitMQService } from "./services/RabbitMQService";
import { ClientOptions, ClientsModule, Transport} from "@nestjs/microservices";
import { RABBITMQ } from "../config/configuration";

@Module({
    imports: [
        ConfigModule,
        ClientsModule.registerAsync([
            {
                imports: [ConfigModule],
                name: 'RABBITMQ_SERVICE',
                useFactory: async (configService: ConfigService): Promise<ClientOptions> => {
                    return {
                        transport: Transport.RMQ,
                        options: {
                            urls: [configService.get<RABBITMQ>('RABBIT_MQ').CONNECT_URI],
                            queue: configService.get<RABBITMQ>('RABBIT_MQ').QUEUE,
                            queueOptions: {
                                durable: false,
                            },
                        }
                    };
                },
                inject: [ConfigService],
            },
        ]),
    ],
    controllers: [UploadController],
    providers: [
        S3Service,
        ConfigService,
        RabbitMQService
    ],
    exports: [S3Service],
})

export class CommonModule {}