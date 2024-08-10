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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("../repositories/users.repository");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async verifyPhoneToken(validatePhoneToken) {
        return await this.usersRepository.findOneByCondition(validatePhoneToken);
    }
    async generatePhoneToken(phoneNumber) {
        let user = await this.usersRepository.findOneByCondition({
            phoneNumber,
        });
        if (!user) {
            user = await this.usersRepository.create({ phoneNumber });
            console.log(user);
        }
        user.verifyToken = await this.generateTokenAndCheck();
        user = await this.usersRepository.update(user._id, user);
        return user;
    }
    async generateTokenAndCheck() {
        const n = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
        const verifyToken = n.toString().padStart(6, "0");
        const checkUser = await this.usersRepository.findOneByCondition({
            verifyToken,
        });
        if (!checkUser) {
            return verifyToken;
        }
        return this.generateTokenAndCheck();
    }
    async clearVerityToken(user) {
        return this.usersRepository.update(user._id, user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map