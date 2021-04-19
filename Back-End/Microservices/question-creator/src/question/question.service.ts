import { Injectable, Logger } from "@nestjs/common";
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { Question } from './entities/question.entity';
import { EntityManager } from 'typeorm';

const logger = new Logger('q_ser');

@Injectable()
export class QuestionService {
  constructor(
    @InjectEntityManager()
    private manager: EntityManager,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const question = this.manager.create(Question, createQuestionDto);
    try {
      const res = await this.manager.insert(Question, question);
      return res.identifiers[0].id;
    } catch (e) {
      return 'An error occurred' + e;
    }
  }

  findOne(id: number) {
    return this.manager.findOne(Question, id);
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
