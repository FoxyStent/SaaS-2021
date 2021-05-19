import { Injectable, Logger } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { Question } from '../question/entities/question.entity';

const logger = new Logger('Answer Service');

@Injectable()
export class AnswerService {
  constructor(
    @InjectEntityManager()
    private manager: EntityManager,
  ) {}

  async create(createAnswerDto: CreateAnswerDto) {
    const ans = this.manager.create(Answer, createAnswerDto);
    logger.log(createAnswerDto.qId);
    const q = await this.manager.findOne(Question, createAnswerDto.qId);
    logger.log(q.title)
    ans.forQuestion = q;
    logger.log(q.answers);
    //q.answers = q.answers || [];
    //q.answers.push(ans);
    logger.log(q.qId);
    logger.log(`Trying to add ${createAnswerDto.text} on ${q.title}`);
    try {
      await this.manager.save(Question, q);
      const res = await this.manager.insert(Answer, ans);
      return { aId: res.identifiers[0].aId }
    } catch (e) {
      return 'An error occurred\n' + e;
    }
  }

  findAll() {
    try {
      return this.manager.find(Answer);
    } catch (e) {
      return 'An error occurred\n' + e;
    }
  }

  findOne(id: number) {
    try {
      return this.manager.findOne(Answer, id, {relations: ['forQuestion']});
    } catch (e) {
      return 'An error occurred\n' + e;
    }
  }

  findUsersAnswers(uid: string) {
    return this.manager.find(Answer, { where: { username: uid } });
  }

  findQuestionsAnswers(qid: number) {
    return this.manager.find(Answer, { where: { qId: qid } });
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
