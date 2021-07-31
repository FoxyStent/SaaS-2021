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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const question_entity_1 = require("./entities/question.entity");
const typeorm_2 = require("typeorm");
const keyword_entity_1 = require("./entities/keyword.entity");
const relations_entity_1 = require("./entities/relations.entity");
const logger = new common_1.Logger('q_ser');
let QuestionService = class QuestionService {
    constructor(manager) {
        this.manager = manager;
    }
    async create(createQuestionDto) {
        const question = this.manager.create(question_entity_1.Question, createQuestionDto);
        question.keyword_relations = [];
        question.answers = [];
        try {
            const res = await this.manager.insert(question_entity_1.Question, question);
            const q_id = res.identifiers[0].id;
            common_1.Logger.log('Traversing Keywords.. ');
            common_1.Logger.log(createQuestionDto.keywords);
            for (const keyword of createQuestionDto.keywords) {
                const rel = new relations_entity_1.Relations();
                rel.question = question;
                const keyw = await this.manager.findOne(keyword_entity_1.Keyword, {
                    where: { name: keyword },
                    relations: ['question_relations'],
                });
                if (!keyw) {
                    const nKeyw = new keyword_entity_1.Keyword();
                    nKeyw.name = keyword;
                    nKeyw.question_relations = [];
                    nKeyw.question_relations.push(rel);
                    rel.keyword = nKeyw;
                    question.keyword_relations.push(rel);
                    await this.manager.insert(keyword_entity_1.Keyword, nKeyw);
                }
                else {
                    keyw.question_relations.push(rel);
                    rel.keyword = keyw;
                    question.keyword_relations.push(rel);
                    await this.manager.save(keyword_entity_1.Keyword, keyw);
                }
                await this.manager.insert(relations_entity_1.Relations, rel);
            }
            await this.manager.save(question_entity_1.Question, question);
            return q_id;
        }
        catch (e) {
            return 'An error occurred' + e;
        }
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
    async findOne(id) {
        const q = await this.manager.findOne(question_entity_1.Question, {
            relations: ['answers', 'keyword_relations'],
            where: { qId: id },
        });
        const keywords = [];
        for (const rel of q.keyword_relations) {
            logger.log(rel.id);
            const key = await this.manager.findOne(relations_entity_1.Relations, {
                relations: ['keyword'],
                where: {
                    id: rel.id,
                },
            });
            keywords.push(key.keyword.name);
        }
        delete q.keyword_relations;
        return Object.assign(Object.assign({}, q), { keywords });
    }
    remove(id) {
        return `This action removes a #${id} question`;
    }
    async getWeekStats() {
        const data = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
        const today = new Date();
        today.setDate(today.getDate() - 7);
        const q = await this.manager.find(question_entity_1.Question, {
            where: { createdAt: typeorm_2.MoreThan(today) },
        });
        today.setDate(today.getDate() + 7);
        q.forEach((question) => data[today.getDate() - question.createdAt.getDate()]++);
        return data;
    }
    async getKeywordsStats() {
        const keys = await this.manager.query('Select keywordKid, COUNT(keywordKid) as count ' +
            'From relations ' +
            'Group By keywordKid ' +
            'Order by count DESC ' +
            'Limit 5');
        const ret = [];
        for (const key of keys) {
            logger.log(key.keywordKid);
            ret.push(Object.assign(Object.assign({}, (await this.manager.findOne(keyword_entity_1.Keyword, {
                select: ['name'],
                where: { kid: key.keywordKid },
            }))), { count: key.count }));
        }
        return ret;
    }
    async getLatest() {
        const ret = [];
        const questions = await this.manager.find(question_entity_1.Question, {
            relations: ['keyword_relations'],
            order: { qId: 'DESC' },
            take: 8,
        });
        for (const question of questions) {
            const keywords = [];
            for (const rel of question.keyword_relations) {
                logger.log(rel.id);
                const key = await this.manager.findOne(relations_entity_1.Relations, {
                    relations: ['keyword'],
                    where: {
                        id: rel.id,
                    },
                });
                keywords.push(key.keyword.name);
            }
            delete question.keyword_relations;
            ret.push(Object.assign(Object.assign({}, question), { keywords }));
        }
        return ret;
    }
};
QuestionService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectEntityManager()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager])
], QuestionService);
exports.QuestionService = QuestionService;
//# sourceMappingURL=question.service.js.map