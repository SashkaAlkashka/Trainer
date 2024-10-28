import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Topic } from '../topic.entity';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { Answer } from './answer.entity';
import { Question } from '../question/question.entity';


@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [
    TypeOrmModule.forFeature([Answer, Question]), 
    
  ],
  exports: [],
})
export class AnswerModule {}
