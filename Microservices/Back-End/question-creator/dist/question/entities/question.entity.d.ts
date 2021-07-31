import { Relations } from './relations.entity';
export declare class Question {
    qId: number;
    title: string;
    text: string;
    keyword_relations: Relations[];
    createdAt: Date;
}
