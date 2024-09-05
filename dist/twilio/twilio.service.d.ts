import { ConfigService } from "@nestjs/config";
export declare class TwilioService {
    private configService;
    private readonly client;
    private readonly basePhone;
    constructor(configService: ConfigService);
    sendVerifySMS(verifyToken: string, phoneNumber: string): Promise<unknown>;
}
