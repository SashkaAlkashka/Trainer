import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath : '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', 
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER, 
      password: process.env.POSTGRESS_PASSWORD, 
      host: process.env.POSTGRES_HOST, 
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'], 
    }),
    UsersModule, AuthModule
  ]
})
export class AppModule {}