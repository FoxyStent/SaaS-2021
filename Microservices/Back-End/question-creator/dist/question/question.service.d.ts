import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { EntityManager } from 'typeorm';
import { Relations } from './entities/relations.entity';
export declare class QuestionService {
    private manager;
    constructor(manager: EntityManager);
    create(createQuestionDto: CreateQuestionDto): Promise<any>;
    findQuestionKeyword(keyword: string): Promise<Relations[]>;
    findOne(id: number): Promise<Question>;
    remove(id: number): string;
}
