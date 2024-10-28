import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module'; // Если используешь AuthModule

import { Topic } from './topic.entity';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { Subject } from 'rxjs';

@Module({
  controllers: [TopicController],
  providers: [TopicService],
  imports: [
    TypeOrmModule.forFeature([Topic, Subject]), 
    
  ],
  exports: [],
})
export class TopicModule {}
