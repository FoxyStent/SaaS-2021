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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const answer_entity_1 = require("./entities/answer.entity");
const question_entity_1 = require("../question/entities/question.entity");
const logger = new common_1.Logger('Answer Service');
let AnswerService = class AnswerService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(createAnswerDto) {
        const ans = this.manager.create(answer_entity_1.Answer, createAnswerDto);
        logger.log(createAnswerDto.qId);
        const q = await this.manager.findOne(question_entity_1.Question, createAnswerDto.qId);
        logger.log(q.title);
        ans.forQuestion = q;
        logger.log(q.answers);
        logger.log(q.qId);
        logger.log(`Trying to add ${createAnswerDto.text} on ${q.title}`);
        try {
            await this.manager.save(question_entity_1.Question, q);
            const res = await this.manager.insert(answer_entity_1.Answer, ans);
            return { aId: res.identifiers[0].aId };
        }
        catch (e) {
            return 'An error occurred\n' + e;
        }
    }
    findAll() {
        try {
            return this.manager.find(answer_entity_1.Answer);
        }
        catch (e) {
            return 'An error occurred\n' + e;
        }
    }
    findOne(id) {
        try {
            return this.manager.findOne(answer_entity_1.Answer, id, { relations: ['forQuestion'] });
        }
        catch (e) {
            return 'An error occurred\n' + e;
        }
    }
    findUsersAnswers(uid) {
        return this.manager.find(answer_entity_1.Answer, { where: { username: uid } });
    }
    findQuestionsAnswers(qid) {
        return this.manager.find(answer_entity_1.Answer, { where: { qId: qid } });
    }
    update(id, updateAnswerDto) {
        return `This action updates a #${id} answer`;
    }
    remove(id) {
        return `This action removes a #${id} answer`;
    }
};
AnswerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map