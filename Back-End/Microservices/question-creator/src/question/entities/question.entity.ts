import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Relations } from './relations.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  qid: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @OneToMany(() => Relations, (r) => r.keyword)
  keyword_relations: Relations[];
}
