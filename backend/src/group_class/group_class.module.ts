import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module'; // Если используешь AuthModule
import { GroupClassController } from './group_class.controller';
import { GroupClassService } from './group_class.service';
import { Class } from './class.entity';
import { Group } from './group.entity'; // Импортируем сущность Group

@Module({
  controllers: [GroupClassController],
  providers: [GroupClassService],
  imports: [
    TypeOrmModule.forFeature([Class, Group]), 
    forwardRef(() => AuthModule),
  ],
  exports: [GroupClassService],
})
export class GroupClassModule {}
