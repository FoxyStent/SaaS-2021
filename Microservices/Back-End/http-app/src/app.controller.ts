import { Controller, Logger, Post, Body, Get, Param, Req } from "@nestjs/common";
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger = new Logger('AppController');

  constructor(private readonly appService: AppService) {}

  /*
  @Post('user')
  async newUser(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
  ) {
    this.logger.log('Adding new user');
    return this.appService.newUser(username, password, email, name);
  }

  @Get('user/:username')
  getUser(@Param('username') username: string) {
    this.logger.log(`Asked for user ${username}`);
    return this.appService.getUser(username);
  }

  @Get('allUsers')
  allUsers(@Req() req: any) {
    this.logger.log('Asked for all Users');
    return this.appService.allUsers(req);
  }

  @Post('login')
  login(@Body('username') username: string, @Body('password') password: string) {
    return this.appService.login(username, password);
  }

  @Post('testAuth')
  auth(@Body('token') token: string) {
    return this.appService.auth(token);
  }

  @Post('question')
  newQuestion(
    @Body('title') title: string,
    @Body('text') text: string,
    @Body('keywords') keywords: string[],
  ) {
    return this.appService.newQuestion(title, text, keywords);
  }

  @Get('question/id/:id')
  findQuestion(@Param('id') id: number) {
    return this.appService.findQuestion(id);
  }

  @Get('question/keyword/:keyword')
  findQuestionKeyword(@Param('keyword') keyword: string) {
    return this.appService.findQuestionKeyword(keyword);
  }

  @Post('answer')
  newAnswer(
    @Body('qid') qid: number,
    @Body('text') text: string,
    @Body('username') username: string,
  ) {
    return this.appService.newAnswer(qid, text, username);
  }

  @Get('answer/:id')
  findAnswer(@Param('id') id: number) {
    return this.appService.findAnswer(id);
  }

  @Get('answer/user/:uid')
  findUsersAnswer(@Param('uid') uid: string) {
    return this.appService.findUsersAnswers(uid);
  }

  @Get('answer/question/:qid')
  findQuestionsAnswers(@Param('qid') qid: number) {
    return this.appService.findQuestionsAnswers(qid);
  }
  */
}
