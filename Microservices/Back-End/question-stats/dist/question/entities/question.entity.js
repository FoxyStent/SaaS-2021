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
exports.Question = void 0;
const typeorm_1 = require("typeorm");
const relations_entity_1 = require("./relations.entity");
const answer_entity_1 = require("../../answer/entities/answer.entity");
let Question = class Question {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], Question.prototype, "qId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Question.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Question.prototype, "text", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Question.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => relations_entity_1.Relations, (r) => r.question),
    __metadata("design:type", Array)
], Question.prototype, "keyword_relations", void 0);
__decorate([
    typeorm_1.OneToMany(() => answer_entity_1.Answer, (a) => a.forQuestion),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
Question = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(['qId'])
], Question);
exports.Question = Question;
//# sourceMappingURL=question.entity.js.map