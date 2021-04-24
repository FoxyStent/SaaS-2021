import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AnswerService } from './answer/answer.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly answerService: AnswerService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('answer')
  newAnswer(
    @Body('qid') qid: number,
    @Body('text') text: string,
    @Body('username') username: string,
    @Body('token') token: string
  ) {
    const dto = {
      qID: qid,
      text: text,
      username: username
    }
    return this.answerService.create(dto, token);
  }

  @Get('answer/:id')
  findAnswer(@Param('id') id: number) {
    return this.answerService.findOne(id);
  }

  @Get('answer/user/:uid')
  findUsersAnswer(@Param('uid') uid: string) {
    return this.answerService.findUsersAnswers(uid);
  }

  @Get('answer/question/:qid')
  findQuestionsAnswers(@Param('qid') qid: number) {
    return this.answerService.findQuestionsAnswers(qid);
  }
}
