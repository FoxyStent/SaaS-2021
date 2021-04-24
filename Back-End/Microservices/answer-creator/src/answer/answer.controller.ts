import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}
/*
  @MessagePattern('createAnswer')
  create(@Payload() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto);
  }

  @MessagePattern('findAllAnswer')
  findAll() {
    return this.answerService.findAll();
  }

  @MessagePattern('findOneAnswer')
  findOne(@Payload() id: number) {
    return this.answerService.findOne(id);
  }

  @MessagePattern('updateAnswer')
  update(@Payload() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(updateAnswerDto.id, updateAnswerDto);
  }

  @MessagePattern('removeAnswer')
  remove(@Payload() id: number) {
    return this.answerService.remove(id);
  }

  @MessagePattern('findUsersAnswers')
  findUsersAnswers(@Payload() uid: string){
    return this.answerService.findUsersAnswers(uid);
  }

  @MessagePattern('findQuestionsAnswers')
  findQuestionsAnswers(@Payload() qid: number) {
    return this.answerService.findQuestionsAnswers(qid);
  }
 */
}
