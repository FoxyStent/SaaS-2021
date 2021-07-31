import { Relations } from "./relations.entity";
export declare class Question {
    qid: number;
    title: string;
    text: string;
    keyword_relations: Relations[];
}
