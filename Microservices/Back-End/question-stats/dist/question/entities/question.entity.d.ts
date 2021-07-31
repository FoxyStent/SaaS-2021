import { Relations } from './relations.entity';
import { Answer } from '../../answer/entities/answer.entity';
export declare class Question {
    qId: number;
    title: string;
    text: string;
    createdAt: Date;
    keyword_relations: Relations[];
    answers: Answer[];
}
