import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, Unique } from "typeorm";
import { Relations } from './relations.entity';
import { Answer } from '../../answer/entities/answer.entity';

@Entity()
@Unique(['qId'])
export class Question {
  @PrimaryColumn()
  qId: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Relations, (r) => r.question)
  keyword_relations: Relations[];

  @OneToMany(() => Answer, (a) => a.forQuestion)
  answers: Answer[];
}
