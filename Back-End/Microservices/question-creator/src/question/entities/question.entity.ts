import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Relations } from './relations.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  qId: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @OneToMany(() => Relations, (r) => r.keyword)
  keyword_relations: Relations[];

  @CreateDateColumn()
  createdAt: Date;
}
