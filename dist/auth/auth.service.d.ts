import { UsersService } from "../users/users.service";
import { User } from "../models/users.model";
import { JwtService } from "@nestjs/jwt";
import { TwilioService } from "../twilio/twilio.service";
import { ValidatePhoneToken } from "../validator/ValidatePhoneToken";
type UserToken = {
    user: User;
    accessToken: String;
};
export declare class AuthService {
    private usersService;
    private jwtService;
    private twilioService;
    constructor(usersService: UsersService, jwtService: JwtService, twilioService: TwilioService);
    validatePhoneToken(validatePhoneToken: ValidatePhoneToken): Promise<UserToken | null>;
    sendPhoneToken(phoneNumber: any): Promise<User>;
    sendDeleteToken(phoneNumber: string): Promise<User>;
}
export {};
