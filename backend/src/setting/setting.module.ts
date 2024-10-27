import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
@Module({
  controllers: [SettingController],
  providers: [SettingService],
  imports: [forwardRef(()=> UsersModule),
    
  ],
    exports: [

      
    ]
  
})
export class SettingModule {}