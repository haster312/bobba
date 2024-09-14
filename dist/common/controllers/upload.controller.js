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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const S3Service_1 = require("../services/S3Service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth-guard");
const upload_dto_1 = require("../dto/upload.dto");
let UploadController = class UploadController {
    constructor(s3Service) {
        this.s3Service = s3Service;
    }
    async getAllStores(uploadDto, req, res) {
        try {
            const { fileContent } = uploadDto;
            const uploadedUrl = await this.s3Service.uploadBase64(fileContent);
            return res.status(common_1.HttpStatus.OK).send({
                url: uploadedUrl
            });
        }
        catch (e) {
            if (e instanceof common_1.BadRequestException) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).send({ message: e.message });
            }
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send({ message: e.message });
        }
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/image/single'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_dto_1.UploadDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "getAllStores", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)("upload"),
    __metadata("design:paramtypes", [S3Service_1.S3Service])
], UploadController);
//# sourceMappingURL=upload.controller.js.map