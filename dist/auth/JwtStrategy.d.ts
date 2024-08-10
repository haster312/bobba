import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "../models/users.model";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: User): Promise<User>;
}
export {};
