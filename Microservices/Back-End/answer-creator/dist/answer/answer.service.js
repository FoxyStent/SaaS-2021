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
const microservices_1 = require("@nestjs/microservices");
const logger = new common_1.Logger('Answer Service');
let AnswerService = class AnswerService {
    constructor(manager) {
        this.manager = manager;
        this.client = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.REDIS,
            options: {
                url: 'redis://localhost:6379',
            },
        });
    }
    async create(createAnswerDto, token) {
        const obs = { result: true };
        if (obs['result'] === true) {
            const ans = this.manager.create(answer_entity_1.Answer, createAnswerDto);
            logger.log(`Trying to add ${createAnswerDto.qId}`);
            try {
                logger.log(createAnswerDto.qId);
                const mes = await this.client.send('createAnswer', createAnswerDto).toPromise();
                const ins = await this.manager.insert(answer_entity_1.Answer, ans);
                return {
                    ins: ins,
                    mes: mes,
                };
            }
            catch (e) {
                return 'An error occurred\n' + e.toString();
            }
        }
        else {
            return 'Authorization failed';
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
            return this.manager.findOne(answer_entity_1.Answer, id);
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