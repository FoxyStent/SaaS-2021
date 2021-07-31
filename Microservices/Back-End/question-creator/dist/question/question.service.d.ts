import { CreateQuestionDto } from './dto/create-question.dto';
import { EntityManager } from 'typeorm';
export declare class QuestionService {
    private manager;
    private client;
    constructor(manager: EntityManager);
    create(createQuestionDto: CreateQuestionDto, token: string): Promise<string | {
        qId: any;
        message: any;
    }>;
    findQuestionKeyword(keyword: string): Promise<any>;
    findOne(id: number): any;
    remove(id: number): string;
}
