"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(configService.get("PORT"));
    console.table({ "Start with port": configService.get("PORT") });
    const server = app.getHttpServer();
    const router = server._events.request._router;
    const availableRoutes = router.stack
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
//# sourceMappingURL=main.js.map