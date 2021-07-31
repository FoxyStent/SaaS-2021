import { AppService } from './app.service';
import { QuestionService } from './question/question.service';
export declare class AppController {
    private readonly appService;
    private readonly questionService;
    constructor(appService: AppService, questionService: QuestionService);
    getHello(): string;
    newQuestion(title: string, text: string, keywords: string[], token: string): Promise<string | {
        qId: any;
        message: any;
    }>;
    findQuestion(id: number): Promise<import("./question/entities/question.entity").Question>;
    findQuestionKeyword(keyword: string): Promise<import("./question/entities/relations.entity").Relations[]>;
}
