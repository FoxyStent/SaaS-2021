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
const answer_service_1 = require("./answer/answer.service");
let AppController = class AppController {
    constructor(appService, answerService) {
        this.appService = appService;
        this.answerService = answerService;
    }
    getHello() {
        return this.appService.getHello();
    }
    newAnswer(qid, text, username, token) {
        const dto = {
            qId: qid,
            text: text,
            username: username
        };
        return this.answerService.create(dto, token);
    }
    findAnswer(id) {
        return this.answerService.findOne(id);
    }
    findUsersAnswer(uid) {
        return this.answerService.findUsersAnswers(uid);
    }
    findQuestionsAnswers(qid) {
        return this.answerService.findQuestionsAnswers(qid);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Post('answer'),
    __param(0, common_1.Body('qid')),
    __param(1, common_1.Body('text')),
    __param(2, common_1.Body('username')),
    __param(3, common_1.Body('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "newAnswer", null);
__decorate([
    common_1.Get('answer/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "findAnswer", null);
__decorate([
    common_1.Get('answer/user/:uid'),
    __param(0, common_1.Param('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "findUsersAnswer", null);
__decorate([
    common_1.Get('answer/question/:qid'),
    __param(0, common_1.Param('qid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "findQuestionsAnswers", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService, answer_service_1.AnswerService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map