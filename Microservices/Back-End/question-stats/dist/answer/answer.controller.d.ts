import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
    create(createAnswerDto: CreateAnswerDto): Promise<string | {
        aId: any;
    }>;
    findAll(): string | Promise<import("./entities/answer.entity").Answer[]>;
    findOne(id: number): string | Promise<import("./entities/answer.entity").Answer>;
    update(updateAnswerDto: UpdateAnswerDto): string;
    remove(id: number): string;
    findUsersAnswers(uid: string): Promise<import("./entities/answer.entity").Answer[]>;
    findQuestionsAnswers(qid: number): Promise<import("./entities/answer.entity").Answer[]>;
}
