import { Injectable, Logger } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { EntityManager, MoreThan } from 'typeorm';
import { Keyword } from './entities/keyword.entity';
import { Relations } from './entities/relations.entity';

const logger = new Logger('q_ser');

@Injectable()
export class QuestionService {
  constructor(
    @InjectEntityManager()
    private manager: EntityManager,
  ) {}

  //add relations to question and keywords and then insert
  async create(createQuestionDto: CreateQuestionDto) {
    const question = this.manager.create(Question, createQuestionDto);
    question.keyword_relations = [];
    question.answers = [];
    try {
      const res = await this.manager.insert(Question, question);
      const q_id = res.identifiers[0].id;
      Logger.log('Traversing Keywords.. ');
      Logger.log(createQuestionDto.keywords);
      for (const keyword of createQuestionDto.keywords) {
        const rel = new Relations();
        rel.question = question;
        const keyw = await this.manager.findOne(Keyword, {
          where: { name: keyword },
          relations: ['question_relations'],
        });
        if (!keyw) {
          const nKeyw = new Keyword();
          nKeyw.name = keyword;
          nKeyw.question_relations = [];

          nKeyw.question_relations.push(rel);
          rel.keyword = nKeyw;
          question.keyword_relations.push(rel);

          await this.manager.insert(Keyword, nKeyw);
        } else {
          keyw.question_relations.push(rel);

          rel.keyword = keyw;
          question.keyword_relations.push(rel);

          await this.manager.save(Keyword, keyw);
        }
        await this.manager.insert(Relations, rel);
      }
      await this.manager.save(Question, question);
      return q_id;
    } catch (e) {
      return 'An error occurred' + e;
    }
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

  async findOne(id: number) {
    const q = await this.manager.findOne(Question, {
      relations: ['answers', 'keyword_relations'],
      where: { qId: id },
    });
    const keywords: any[] = [];
    for (const rel of q.keyword_relations) {
      logger.log(rel.id);
      const key = await this.manager.findOne(Relations, {
        relations: ['keyword'],
        where: {
          id: rel.id,
        },
      });
      keywords.push(key.keyword.name);
    }
    delete q.keyword_relations;
    return { ...q, keywords };
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }

  async getWeekStats() {
    const data = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const today = new Date();
    today.setDate(today.getDate() - 7);
    const q = await this.manager.find(Question, {
      where: { createdAt: MoreThan(today) },
    });
    today.setDate(today.getDate() + 7);
    q.forEach((question) => {
        data[today.getDate() - question.createdAt.getDate()]++;
      }
    );
    return data

  }

  async getKeywordsStats() {
    const keys = await this.manager.query(
      'Select keywordKid, COUNT(keywordKid) as count ' +
        'From relations ' +
        'Group By keywordKid ' +
        'Order by count DESC ' +
        'Limit 5',
    );
    const ret: any[] = [];
    for (const key of keys) {
      logger.log(key.keywordKid);
      ret.push({
        ...(await this.manager.findOne(Keyword, {
          select: ['name'],
          where: { kid: key.keywordKid },
        })),
        count: key.count,
      });
    }
    return ret;
  }

  async getLatest() {
    const ret: any[] = [];
    const questions = await this.manager.find(Question, {
      relations: ['keyword_relations'],
      order: { qId: 'DESC' },
      take: 5,
    });
    for (const question of questions) {
      const keywords: any[] = [];
      for (const rel of question.keyword_relations) {
        logger.log(rel.id);
        const key = await this.manager.findOne(Relations, {
          relations: ['keyword'],
          where: {
            id: rel.id,
          },
        });
        keywords.push(key.keyword.name);
      }
      delete question.keyword_relations;
      ret.push({ ...question, keywords });
    }
    return ret;
  }
}
