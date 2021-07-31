import { Question } from '../../question/entities/question.entity';
export declare class Answer {
    aId: number;
    forQuestion: Question;
    text: string;
    username: string;
    createdAt: Date;
}
