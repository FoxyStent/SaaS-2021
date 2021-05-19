import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from '@nestjs/microservices';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @MessagePattern('createQuestion')
  create(@Payload() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @MessagePattern('findQuestion')
  findOne(@Payload() id: number) {
    return this.questionService.findOne(id);
  }

  @MessagePattern('removeQuestion')
  remove(@Payload() id: number) {
    return this.questionService.remove(id);
  }

  @MessagePattern('findQuestionKeyword')
  findQuestionKeyword(@Payload() keyword: string) {
    return this.questionService.findQuestionKeyword(keyword);
  }
}
