import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import * as bodyParser from 'body-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RABBITMQ } from "./config/configuration";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get<ConfigService>(ConfigService);
    // Body Parser
    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
    app.useGlobalPipes(new ValidationPipe());

    const rabbitMQ = configService.get<RABBITMQ>('RABBIT_MQ');

    //RabbitMQ
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [`${rabbitMQ.CONNECT_URI}`],
            queue: rabbitMQ.QUEUE,
            queueOptions: {
                durable: true,
            },
        },
    });

    await app.startAllMicroservices();
    await app.listen(configService.get<number>("PORT"));
    console.table({ "Start with port": configService.get<number>("PORT") });

    const server = app.getHttpServer();
    const router = server._events.request._router;
    const availableRoutes: [] = router.stack
        .map((layer) => {
            if (layer.route) {
                return {
                    route: {
                        path: layer.route?.path,
                        method: layer.route?.stack[0].method
                    }
                };
            }
        })
        .filter((item) => item !== undefined);
    console.log(availableRoutes);
}

bootstrap();
