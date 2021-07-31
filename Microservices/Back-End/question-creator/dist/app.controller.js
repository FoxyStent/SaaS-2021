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
let AppController = class AppController {
    constructor(appService, questionService) {
        this.appService = appService;
        this.questionService = questionService;
    }
    getHello() {
        return this.appService.getHello();
    }
    newQuestion(title, text, keywords, token) {
        const dto = {
            title: title,
            text: text,
            keywords: keywords,
        };
        return this.questionService.create(dto, token);
    }
    findQuestion(id) {
        return this.questionService.findOne(id);
    }
    findQuestionKeyword(keyword) {
        return this.questionService.findQuestionKeyword(keyword);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Post('question'),
    __param(0, common_1.Body('title')),
    __param(1, common_1.Body('text')),
    __param(2, common_1.Body('keywords')),
    __param(3, common_1.Body('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "newQuestion", null);
__decorate([
    common_1.Get('question/id/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "findQuestion", null);
__decorate([
    common_1.Get('question/keyword/:keyword'),
    __param(0, common_1.Param('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "findQuestionKeyword", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        question_service_1.QuestionService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map