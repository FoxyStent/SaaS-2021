import { CreateQuestionDto } from './dto/create-question.dto';
import { EntityManager } from 'typeorm';
import { Relations } from './entities/relations.entity';
export declare class QuestionService {
    private manager;
    constructor(manager: EntityManager);
    create(createQuestionDto: CreateQuestionDto): Promise<any>;
    findQuestionKeyword(keyword: string): Promise<Relations[]>;
    findOne(id: number): Promise<{
        keywords: any[];
        qId: number;
        title: string;
        text: string;
        createdAt: Date;
        keyword_relations: Relations[];
        answers: import("../answer/entities/answer.entity").Answer[];
    }>;
    remove(id: number): string;
    getWeekStats(): Promise<{
        0: number;
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
        6: number;
    }>;
    getKeywordsStats(): Promise<any[]>;
    getLatest(): Promise<any[]>;
}
