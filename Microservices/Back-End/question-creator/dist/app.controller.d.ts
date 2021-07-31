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
    findQuestion(id: number): any;
    findQuestionKeyword(keyword: string): Promise<any>;
}
