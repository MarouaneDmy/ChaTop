import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  app.useGlobalGuards(new JwtAuthGuard(app.get('Reflector')));

  await app.listen(3000);
}
bootstrap();
