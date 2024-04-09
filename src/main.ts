import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

export enum AddonType {
    BASE = "base",
    FLAVOR = "flavor",
    TOPPING = "topping",
    CONDIMENT = "condiment"
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get<ConfigService>(ConfigService);
    app.useGlobalPipes(new ValidationPipe());
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
