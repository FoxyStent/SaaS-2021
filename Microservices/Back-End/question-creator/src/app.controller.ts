import { Body, Controller, Get, Param, Post, Req, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { QuestionService } from './question/question.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly questionService: QuestionService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('question')
  newQuestion(
    @Body('title') title: string,
    @Body('text') text: string,
    @Body('keywords') keywords: string[],
    @Req() request: Request
  ) {
    const dto = {
      title: title,
      text: text,
      keywords: keywords,
    };
    const token = request.headers['authorization'].replace('Bearer ', '');
    return this.questionService.create(dto, token);
  }

  @Get('question/id/:id')
  findQuestion(@Param('id') id: number) {
    return this.questionService.findOne(id);
  }

  @Get('question/keyword/:keyword')
  findQuestionKeyword(@Param('keyword') keyword: string) {
    return this.questionService.findQuestionKeyword(keyword);
  }

  @Get('question/title/:tit')
  findQuestionTitle(@Param('tit') tit: string) {
    return this.questionService.findQuestionTitle(tit);
  }
}
