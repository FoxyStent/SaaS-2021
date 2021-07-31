import { Injectable, Logger, NotFoundException,
  UnauthorizedException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { EntityManager, Like } from 'typeorm';
import { Keyword } from './entities/keyword.entity';
import { Relations } from './entities/relations.entity';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

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
        url: process.env.REDIS_URL,
        retryAttempts: 5,
        retryDelay: 10,
      },
    });
  }

  async create(createQuestionDto: CreateQuestionDto, token: string) {
    const auth = await this.client.send('authenticateMe', token).toPromise();
    if (auth['result'] === true) {
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
          k.name = keyword.trim();
          const res = await this.manager.findOne(Keyword, k);
          logger.log(res);
          if (!res) {
            logger.log('Added ' + keyword.trim());
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
    } else throw new UnauthorizedException('NotLoggedIn');
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

  async findQuestionTitle(tit: string) {
    return await this.manager.find(Question, {
      select: ['title', 'text', 'createdAt'],
      where : {title: Like(`%${tit}%`)},
      take: 3
    });
  }

  findOne(id: number) {
    return this.manager.findOne(Question, id);
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
