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
exports.Relations = void 0;
const typeorm_1 = require("typeorm");
const question_entity_1 = require("./question.entity");
const keyword_entity_1 = require("./keyword.entity");
let Relations = class Relations {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Relations.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => question_entity_1.Question, (q) => q.keyword_relations),
    __metadata("design:type", question_entity_1.Question)
], Relations.prototype, "question", void 0);
__decorate([
    typeorm_1.ManyToOne(() => keyword_entity_1.Keyword, (k) => k.question_relations),
    __metadata("design:type", keyword_entity_1.Keyword)
], Relations.prototype, "keyword", void 0);
Relations = __decorate([
    typeorm_1.Entity()
], Relations);
exports.Relations = Relations;
//# sourceMappingURL=relations.entity.js.map