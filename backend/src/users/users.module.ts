
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { GroupClassModule } from 'src/group_class/group_class.module';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    forwardRef(() => GroupClassModule),
  ],
  exports: [UserService]

  
})
export class UsersModule {}