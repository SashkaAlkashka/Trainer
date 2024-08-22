import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);

  // Включение CORS с нужными настройками
  app.enableCors({
    origin: '*', // Разрешить доступ с любых источников (для разработки)
    allowedHeaders: 'Authorization, Origin, X-Requested-With, Content-Type, Accept',
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  });

  const config = new DocumentBuilder()
    .setTitle('Test')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',
    }, 'access-token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api_docs', app, document);

  
  await app.listen(PORT); // Устанавливаем порт прослушивания
  console.log(`Server is running on http://localhost:${PORT}`);
  
  await app.setGlobalPrefix('/api'); // Глобальный префикс для роутов контроллера
}

bootstrap();
