import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Test')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('api_docs', app, document); 

  await app.listen(PORT); //устанавливаем порт прослушивания
  console.log(PORT);

  await app.setGlobalPrefix('/api'); //глобальный префикс для роутов контроллера
}
bootstrap();