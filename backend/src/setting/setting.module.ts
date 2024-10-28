import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { GroupClassModule } from 'src/group_class/group_class.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [SettingController],
  providers: [SettingService],
  imports: [forwardRef(()=> UsersModule),
    forwardRef(()=> GroupClassModule),
    forwardRef(() => AuthModule)
  ],
    exports: [

      
    ]
  
})
export class SettingModule {}