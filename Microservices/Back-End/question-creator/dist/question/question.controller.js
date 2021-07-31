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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const question_service_1 = require("./question.service");
const create_question_dto_1 = require("./dto/create-question.dto");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    create(createQuestionDto) {
        return this.questionService.create(createQuestionDto);
    }
    findOne(id) {
        return this.questionService.findOne(id);
    }
    remove(id) {
        return this.questionService.remove(id);
    }
    findQuestionKeyword(keyword) {
        return this.questionService.findQuestionKeyword(keyword);
    }
};
__decorate([
    microservices_1.MessagePattern('createQuestion'),
    __param(0, microservices_1.Payload()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_dto_1.CreateQuestionDto]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "create", null);
__decorate([
    microservices_1.MessagePattern('findQuestion'),
    __param(0, microservices_1.Payload()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findOne", null);
__decorate([
    microservices_1.MessagePattern('removeQuestion'),
    __param(0, microservices_1.Payload()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "remove", null);
__decorate([
    microservices_1.MessagePattern('findQuestionKeyword'),
    __param(0, microservices_1.Payload()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "findQuestionKeyword", null);
QuestionController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
exports.QuestionController = QuestionController;
//# sourceMappingURL=question.controller.js.map