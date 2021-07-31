import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { EntityManager } from 'typeorm';
import { Answer } from './entities/answer.entity';
export declare class AnswerService {
    private manager;
    private client;
    constructor(manager: EntityManager);
    create(createAnswerDto: CreateAnswerDto, token: string): Promise<string | {
        ins: import("typeorm").InsertResult;
        mes: any;
    }>;
    findAll(): string | Promise<Answer[]>;
    findOne(id: number): string | Promise<Answer>;
    findUsersAnswers(uid: string): Promise<Answer[]>;
    findQuestionsAnswers(qid: number): Promise<Answer[]>;
    update(id: number, updateAnswerDto: UpdateAnswerDto): string;
    remove(id: number): string;
}
