"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
exports.default = mongoose_1.MongooseModule.forRootAsync({
    imports: [config_1.ConfigModule],
    useFactory: async (configService) => ({
        uri: configService.get("MONGO_URI")
    }),
    inject: [config_1.ConfigService]
});
//# sourceMappingURL=mongodb.js.map