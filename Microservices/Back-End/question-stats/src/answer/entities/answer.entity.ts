import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from '../../question/entities/question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  aId: number;

  @ManyToOne(() => Question, (q) => q.answers)
  forQuestion: Question;

  @Column()
  text: string;

  @Column()
  username: string;

  @CreateDateColumn()
  createdAt: Date;
}
