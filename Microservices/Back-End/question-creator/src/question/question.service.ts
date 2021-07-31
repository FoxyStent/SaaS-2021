import { Injectable, Logger } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { EntityManager } from 'typeorm';
import { Keyword } from './entities/keyword.entity';
import { Relations } from './entities/relations.entity';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { json } from 'express';

const logger = new Logger('q_ser');

@Injectable()
export class QuestionService {
  private client: ClientProxy;

  constructor(
    @InjectEntityManager()
    private manager: EntityManager,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    });
  }

  async create(createQuestionDto: CreateQuestionDto, token: string) {
    //const obs = await this.client.send('authenticateMe', token).toPromise();
    const obs = { result: true };
    if (obs['result'] === true) {
      const question = this.manager.create(Question, createQuestionDto);
      try {
        const res = await this.manager.insert(Question, question);
        const q_id = res.identifiers[0].qId;
        logger.log('qId: ' + q_id);
        Logger.log(createQuestionDto.keywords);
        Logger.log('Traversing Keywords.. ');
        for (const keyword of createQuestionDto.keywords) {
          logger.log('Now on: ' + keyword);
          const k = new Keyword();
          k.name = keyword;
          const res = await this.manager.findOne(Keyword, k);
          logger.log(res);
          if (!res) {
            logger.log('Added ' + keyword);
            await this.manager.insert(Keyword, k);
          }
          const rel = new Relations();
          rel.question = question;
          if (!res) rel.keyword = k;
          else rel.keyword = res;
          await this.manager.insert(Relations, rel);
        }
        const dto = { ...createQuestionDto, qId: q_id };
        const mes = await this.client.send('createQuestion', dto).toPromise();
        return {
          qId: q_id,
          message: mes,
        };
      } catch (e) {
        return 'An error occurred' + e;
      }
    } else return 'An error occured\n' + obs['name'];
  }

  async findQuestionKeyword(keyword: string) {
    const k = await this.manager.findOne(Keyword, {
      select: ['kid'],
      where: { name: keyword },
    });
    return await this.manager.find(Relations, {
      relations: ['question'],
      where: { keyword: k },
    });
  }

  findOne(id: number) {
    return this.manager.findOne(Question, id);
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}