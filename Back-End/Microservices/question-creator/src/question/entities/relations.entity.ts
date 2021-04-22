import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from './question.entity';
import { Keyword } from './keyword.entity';

@Entity()
export class Relations {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (q) => q.keyword_relations)
  question: Question;

  @ManyToOne(() => Keyword, (k) => k.question_relations)
  keyword: Keyword;
}
