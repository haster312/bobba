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
exports.UsersModel = exports.User = exports.GENDER = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_model_1 = require("./base.model");
var GENDER;
(function (GENDER) {
    GENDER["Male"] = "MALE";
    GENDER["Female"] = "FEMALE";
    GENDER["Other"] = "OTHER";
})(GENDER || (exports.GENDER = GENDER = {}));
let User = class User extends base_model_1.BaseModel {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isUpdated", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "birthday", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        trim: true,
        index: true,
        sparse: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "googleToken", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "appleToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: GENDER }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ minlength: 4, maxlength: 6 }),
    __metadata("design:type", String)
], User.prototype, "verifyToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({ minlength: 4, maxlength: 6 }),
    __metadata("design:type", String)
], User.prototype, "deleteToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", Boolean)
], User.prototype, "acceptTerm", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    })
], User);
exports.UsersModel = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=users.model.js.map