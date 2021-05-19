import { Controller, Get, Logger, Param } from "@nestjs/common";
import { AppService } from "./app.service";
import { QuestionService } from "./question/question.service";
import { AnswerService } from "./answer/answer.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly questionService: QuestionService,
    private readonly answerService: AnswerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('preview/:number')
  getQuestion(@Param('number') number: number) {
    return this.questionService.findOne(number);
  }

  @Get('previews/latest')
  getLatest() {
    Logger.log('latest');
    return this.questionService.getLatest();
  }

  @Get('week')
  getWeekStats() {
    return this.questionService.getWeekStats();
  }

  @Get('keywords')
  getKeywordsStats() {
    return this.questionService.getKeywordsStats();
  }
}
