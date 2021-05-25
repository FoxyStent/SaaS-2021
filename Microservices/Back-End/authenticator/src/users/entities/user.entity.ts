import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @CreateDateColumn()
  memberSince: Date;

  @BeforeInsert()
  async encrypt() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
