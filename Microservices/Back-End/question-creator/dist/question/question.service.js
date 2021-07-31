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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const question_entity_1 = require("./entities/question.entity");
const typeorm_2 = require("typeorm");
const keyword_entity_1 = require("./entities/keyword.entity");
const relations_entity_1 = require("./entities/relations.entity");
const microservices_1 = require("@nestjs/microservices");
const logger = new common_1.Logger('q_ser');
let QuestionService = class QuestionService {
    constructor(manager) {
        this.manager = manager;
        this.client = microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.REDIS,
            options: {
                url: process.env.REDIS_URL,
                retryAttempts: 5,
                retryDelay: 10,
            },
        });
    }
    async create(createQuestionDto, token) {
        const obs = { result: true };
        if (obs['result'] === true) {
            const question = this.manager.create(question_entity_1.Question, createQuestionDto);
            try {
                const res = await this.manager.insert(question_entity_1.Question, question);
                const q_id = res.identifiers[0].qId;
                logger.log('qId: ' + q_id);
                common_1.Logger.log(createQuestionDto.keywords);
                common_1.Logger.log('Traversing Keywords.. ');
                for (const keyword of createQuestionDto.keywords) {
                    logger.log('Now on: ' + keyword);
                    const k = new keyword_entity_1.Keyword();
                    k.name = keyword;
                    const res = await this.manager.findOne(keyword_entity_1.Keyword, k);
                    logger.log(res);
                    if (!res) {
                        logger.log('Added ' + keyword);
                        await this.manager.insert(keyword_entity_1.Keyword, k);
                    }
                    const rel = new relations_entity_1.Relations();
                    rel.question = question;
                    if (!res)
                        rel.keyword = k;
                    else
                        rel.keyword = res;
                    await this.manager.insert(relations_entity_1.Relations, rel);
                }
                const dto = Object.assign(Object.assign({}, createQuestionDto), { qId: q_id });
                const mes = await this.client.send('createQuestion', dto).toPromise();
                return {
                    qId: q_id,
                    message: mes,
                };
            }
            catch (e) {
                return 'An error occurred' + e;
            }
        }
        else
            return 'An error occured\n' + obs['name'];
    }
    async findQuestionKeyword(keyword) {
        const k = await this.manager.findOne(keyword_entity_1.Keyword, {
            select: ['kid'],
            where: { name: keyword },
        });
        return await this.manager.find(relations_entity_1.Relations, {
            relations: ['question'],
            where: { keyword: k },
        });
    }
    findOne(id) {
        return this.manager.findOne(question_entity_1.Question, id);
    }
    remove(id) {
        return `This action removes a #${id} question`;
    }
};
QuestionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.EntityManager !== "undefined" && typeorm_2.EntityManager) === "function" ? _a : Object])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map