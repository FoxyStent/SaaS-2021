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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const users_service_1 = require("./users/users.service");
const logger = new common_1.Logger('User');
let AppController = class AppController {
    constructor(appService, userService) {
        this.appService = appService;
        this.userService = userService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async newUser(username, email, password, name) {
        logger.log('Adding new user');
        const dto = {
            username: username,
            password: password,
            email: email,
            name: name,
        };
        try {
            return await this.userService.create(dto);
        }
        catch (e) {
            logger.log(`Caught error on adding user ${username}: ${e}`);
            throw new common_1.HttpException({ error: e.message }, common_1.HttpStatus.CONFLICT);
        }
    }
    getUser(username) {
        logger.log(`Asked for user ${username}`);
        return this.userService.findOne(username);
    }
    allUsers() {
        logger.log('Asked for all Users');
        return this.userService.find();
    }
    login(username, password) {
        const uinfo = {
            username: username,
            password: password,
        };
        return this.userService.login(uinfo);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('user'),
    __param(0, common_1.Body('username')),
    __param(1, common_1.Body('email')),
    __param(2, common_1.Body('password')),
    __param(3, common_1.Body('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "newUser", null);
__decorate([
    common_1.Get('user/:username'),
    __param(0, common_1.Param('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getUser", null);
__decorate([
    common_1.Get('allUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "allUsers", null);
__decorate([
    common_1.HttpCode(200),
    common_1.Post('login'),
    __param(0, common_1.Body('username')),
    __param(1, common_1.Body('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "login", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        users_service_1.UsersService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map