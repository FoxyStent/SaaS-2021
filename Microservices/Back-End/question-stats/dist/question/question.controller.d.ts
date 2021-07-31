import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(createQuestionDto: CreateQuestionDto): Promise<any>;
    findOne(id: number): Promise<{
        keywords: any[];
        qId: number;
        title: string;
        text: string;
        createdAt: Date;
        keyword_relations: import("./entities/relations.entity").Relations[];
        answers: import("../answer/entities/answer.entity").Answer[];
    }>;
    remove(id: number): string;
    findQuestionKeyword(keyword: string): Promise<import("./entities/relations.entity").Relations[]>;
}
