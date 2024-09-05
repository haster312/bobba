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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const GetPhoneToken_1 = require("../validator/GetPhoneToken");
const ValidatePhoneToken_1 = require("../validator/ValidatePhoneToken");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async validatePhoneToken(validatePhoneToken, res) {
        const userToken = await this.authService.validatePhoneToken(validatePhoneToken);
        if (!userToken) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .send({ message: "Verify token is not valid" });
        }
        return res.status(common_1.HttpStatus.OK).send(userToken);
    }
    async getPhoneToken(getPhoneToken, res) {
        try {
            const phoneNumber = getPhoneToken.phoneNumber;
            const user = await this.authService.sendPhoneToken(phoneNumber);
            return res
                .status(common_1.HttpStatus.OK)
                .send({ verifyToken: user.verifyToken });
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: e.message });
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("phone/verify"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ValidatePhoneToken_1.ValidatePhoneToken, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validatePhoneToken", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("phone/token"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetPhoneToken_1.GetPhoneToken, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getPhoneToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map