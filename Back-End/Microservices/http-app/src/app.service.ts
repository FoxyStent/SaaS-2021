import { Injectable, Logger } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { userInfo } from "os";
import { strict } from "assert";

const logger = new Logger('AppService');

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      },
    });
  }

  public getUser(username: string) {
    return this.client.send<string, string>('findOneUser', username);
  }

  public newUser( username: string, password: string, email: string, name: string) {
    const userInfo = {
      email: email,
      username: username,
      name: name,
      password: password,
    };
    logger.log('Sending ' + userInfo.toString());
    return this.client.send<string>('createUser', userInfo);
  }

  public allUsers(req: any) {
    return this.client.send('findAllUsers', req.headers);
  }

  public login(username: string, password: string) {
    const userInfo = {
      username: username,
      password: password,
    };
    logger.log(typeof userInfo);
    return this.client.send('loginUser', userInfo);
  }

  public auth(token: string) {
    logger.log('Asked to authenticate User');
    const info = {
      token: token,
    };
    return this.client.send('authenticateMe', info);
  }

  public newQuestion(title: string, text: string, keywords: string[]) {
    logger.log('Asked to create new answer' + text + title + keywords);
    const q = {
      title: title,
      text: text,
      keywords: keywords,
    };
    return this.client.send('createQuestion', q);
  }

  public findQuestion(id: number) {
    logger.log(`Asked for Question#${id}`);
    return this.client.send('findQuestion', id);
  }

  public findQuestionKeyword(keyword: string) {
    logger.log(`Asked for Questions with keyword ${keyword}`);
    return this.client.send('findQuestionKeyword', keyword);
  }

  public newAnswer(qid: number, text: string, username: string) {
    logger.log('Asked to create new answer ' + text);
    const a = {
      qId: qid,
      text: text,
      username: username,
    };
    return this.client.send('createAnswer', a);
  }

  public findAnswer(id: number) {
    return this.client.send('findOne', id)
  }

  public findUsersAnswers(uid: string) {
    return this.client.send('findUsersAnswers', uid);
  }

  public findQuestionsAnswers(qid: number) {
    return this.client.send('findQuestionsAnswers', qid);
  }
}
