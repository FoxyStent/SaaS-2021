import { AppService } from './app.service';
import { AnswerService } from './answer/answer.service';
export declare class AppController {
    private readonly appService;
    private readonly answerService;
    constructor(appService: AppService, answerService: AnswerService);
    getHello(): string;
    newAnswer(qid: number, text: string, username: string, token: string): Promise<string | {
        ins: import("typeorm").InsertResult;
        mes: any;
    }>;
    findAnswer(id: number): string | Promise<import("./answer/entities/answer.entity").Answer>;
    findUsersAnswer(uid: string): Promise<import("./answer/entities/answer.entity").Answer[]>;
    findQuestionsAnswers(qid: number): Promise<import("./answer/entities/answer.entity").Answer[]>;
}
