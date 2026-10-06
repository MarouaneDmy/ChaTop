import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  app.useGlobalGuards(new JwtAuthGuard(app.get('Reflector')));

  const config = new DocumentBuilder()
    .setTitle('Chatop API')
    .setDescription("Documentation de l'API Chatop")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
