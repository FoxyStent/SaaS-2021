import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  aId: number;

  @Column()
  qId: number;

  @Column()
  text: string;

  @Column()
  username: string;

  @CreateDateColumn()
  createdAt: Date;
}
