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
const question_service_1 = require("./question/question.service");
const answer_service_1 = require("./answer/answer.service");
let AppController = class AppController {
    constructor(appService, questionService, answerService) {
        this.appService = appService;
        this.questionService = questionService;
        this.answerService = answerService;
    }
    getHello() {
        return this.appService.getHello();
    }
    getQuestion(number) {
        return this.questionService.findOne(number);
    }
    getLatest() {
        common_1.Logger.log('latest');
        return this.questionService.getLatest();
    }
    getWeekStats() {
        return this.questionService.getWeekStats();
    }
    getKeywordsStats() {
        return this.questionService.getKeywordsStats();
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Get('preview/:number'),
    __param(0, common_1.Param('number')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getQuestion", null);
__decorate([
    common_1.Get('previews/latest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getLatest", null);
__decorate([
    common_1.Get('week'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getWeekStats", null);
__decorate([
    common_1.Get('keywords'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getKeywordsStats", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        question_service_1.QuestionService,
        answer_service_1.AnswerService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map