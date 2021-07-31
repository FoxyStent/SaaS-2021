import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AnswerModule,
    QuestionModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.CLEARDB_DATABASE_URL,
      synchronize: true,
      "entities": ["dist/**/*.entity{.ts,.js}"],
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
