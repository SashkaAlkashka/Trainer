import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
import { GroupClassModule } from './group_class/group_class.module';
import { SettingModule } from './setting/setting.module';
import { TopicModule } from './topic_que_ans/topic/topic.module';
import { QuestionModule } from './topic_que_ans/topic/question/question.module';
import { AnswerModule } from './topic_que_ans/topic/answer/answer.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath : '.db_info'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', 
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER, 
      password: process.env.POSTGRESS_PASSWORD, 
      host: process.env.POSTGRES_HOST, 
      database: process.env.POSTGRES_DB,
      synchronize: false,
      entities: ['dist/**/*.entity{.ts,.js}'], 
    }),
    UsersModule, AuthModule, GroupClassModule, SettingModule,
    TopicModule, QuestionModule, AnswerModule
  ]
})
export class AppModule {}