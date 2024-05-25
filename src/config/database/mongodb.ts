import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
export default MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_URI")
    }),
    inject: [ConfigService]
});
