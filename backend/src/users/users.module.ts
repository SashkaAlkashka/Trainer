
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  exports: [UserService]

  
})
export class UsersModule {}