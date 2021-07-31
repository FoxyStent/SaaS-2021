import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Relations } from './relations.entity';

@Entity()
@Unique(['name'])
export class Keyword {
  @PrimaryGeneratedColumn()
  kid: number;

  @Column()
  name: string;

  @OneToMany(() => Relations, r => r.question)
  question_relations: Relations[];
}
