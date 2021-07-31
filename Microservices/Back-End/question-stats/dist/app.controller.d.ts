import { AppService } from "./app.service";
import { QuestionService } from "./question/question.service";
import { AnswerService } from "./answer/answer.service";
export declare class AppController {
    private readonly appService;
    private readonly questionService;
    private readonly answerService;
    constructor(appService: AppService, questionService: QuestionService, answerService: AnswerService);
    getHello(): string;
    getQuestion(number: number): Promise<{
        keywords: any[];
        qId: number;
        title: string;
        text: string;
        createdAt: Date;
        keyword_relations: import("./question/entities/relations.entity").Relations[];
        answers: import("./answer/entities/answer.entity").Answer[];
    }>;
    getLatest(): Promise<any[]>;
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
}
