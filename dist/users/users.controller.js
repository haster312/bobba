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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth-guard");
const users_service_1 = require("./users.service");
const UserInfo_1 = require("../validator/UserInfo");
const auth_service_1 = require("../auth/auth.service");
const ValidateDeleteToken_1 = require("../validator/ValidateDeleteToken");
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async getUserInfo(req, res) {
        const user = await this.usersService.usersRepository.findOneById(req.user.id);
        if (!user) {
            res.status(common_1.HttpStatus.NOT_FOUND).send({
                message: "User not found",
            });
        }
        return res.status(common_1.HttpStatus.OK).send({ user });
    }
    async updateUserInfo(data, req, res) {
        try {
            let user = await this.usersService.usersRepository.findOneById(req.user.id);
            if (!user) {
                res.status(common_1.HttpStatus.NOT_FOUND).send({
                    message: "User not found",
                });
            }
            user = await this.usersService.usersRepository.update(user._id, data);
            return res.status(common_1.HttpStatus.OK).send({ user });
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: e.message });
        }
    }
    async requestToDelete(req, res) {
        try {
            let user = await this.usersService.usersRepository.findOneById(req.user.id);
            if (!user) {
                res.status(common_1.HttpStatus.NOT_FOUND).send({
                    message: "User not found",
                });
            }
            user = await this.authService.sendDeleteToken(user.phoneNumber);
            return res.status(common_1.HttpStatus.OK).send({ deleteToken: user.deleteToken });
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: e.message });
        }
    }
    async proceedDeleteUser(validateDeleteToken, req, res) {
        try {
            let user = await this.usersService.usersRepository.findOneById(req.user.id);
            if (!user) {
                res.status(common_1.HttpStatus.NOT_FOUND).send({
                    message: "User not found",
                });
            }
            if (user.deleteToken !== validateDeleteToken.deleteToken) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).send({ message: "Delete token is not correct!" });
            }
            const deleted = await this.usersService.deleteUser(user);
            return res.status(common_1.HttpStatus.OK).send({ deleted });
        }
        catch (e) {
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: e.message });
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)("info"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("info"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInfo_1.UserInfo, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserInfo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)("delete/request"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "requestToDelete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Delete)("delete"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ValidateDeleteToken_1.ValidateDeleteToken, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "proceedDeleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [users_service_1.UsersService, auth_service_1.AuthService])
], UsersController);
//# sourceMappingURL=users.controller.js.map