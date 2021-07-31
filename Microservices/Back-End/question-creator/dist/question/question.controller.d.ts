import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(createQuestionDto: CreateQuestionDto): Promise<any>;
    findOne(id: number): Promise<import("./entities/question.entity").Question>;
    remove(id: number): string;
    findQuestionKeyword(keyword: string): Promise<import("./entities/relations.entity").Relations[]>;
}
