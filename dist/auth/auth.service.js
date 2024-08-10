"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const twilio_service_1 = require("../twilio/twilio.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, twilioService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.twilioService = twilioService;
    }
    async validatePhoneToken(validatePhoneToken) {
        const user = await this.usersService.verifyPhoneToken(validatePhoneToken);
        let accessToken = "";
        if (!user) {
            return null;
        }
        accessToken = await this.jwtService.signAsync({
            id: user._id,
            phoneNumber: user.phoneNumber,
            googleToken: user.googleToken,
            appleToken: user.appleToken,
        });
        user.verifyToken = null;
        await this.usersService.clearVerityToken(user);
        return {
            user,
            accessToken
        };
    }
    async sendPhoneToken(phoneNumber) {
        const user = await this.usersService.generatePhoneToken(phoneNumber);
        await this.twilioService.sendVerifySMS(user.verifyToken, user.phoneNumber);
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        twilio_service_1.TwilioService])
], AuthService);
//# sourceMappingURL=auth.service.js.map