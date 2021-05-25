import { Injectable, Logger } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

const logger = new Logger('Answer Service');

@Injectable()
export class AnswerService {
  private client: ClientProxy;

  constructor(
    @InjectEntityManager()
    private manager: EntityManager
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    });
  }

  async create(createAnswerDto: CreateAnswerDto, token: string) {
    //const obs = await this.client.send('authenticateMe', token).toPromise();
    const obs = { result: true };
    if (obs['result'] === true) {
      const ans = this.manager.create(Answer, createAnswerDto);
      logger.log(`Trying to add ${createAnswerDto.qId}`);
      try {
        logger.log(createAnswerDto.qId)
        const mes = await this.client.send('createAnswer', createAnswerDto).toPromise();
        const ins = await this.manager.insert(Answer, ans);
        return {
          ins: ins,
          mes: mes,
        }
      } catch (e) {
        return 'An error occurred\n' + e.toString();
      }
    }
    else {
      return 'Authorization failed';
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
      return this.manager.findOne(Answer, id);
    } catch (e) {
      return 'An error occurred\n' + e;
    }
  }

  findUsersAnswers(uid: string) {
    return this.manager.find(Answer, {where: { username: uid}});
  }

  findQuestionsAnswers(qid: number) {
    return this.manager.find(Answer, {where: { qId: qid}});
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
