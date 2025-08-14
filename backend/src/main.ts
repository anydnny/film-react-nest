import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

import { DevModeLogger } from './logger/devMode.logger';
import { JsonModeLogger } from './logger/jsonMode.logger';
import { TskvLogger } from './logger/tskvMode.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const loggerType = process.env.LOGGER_TYPE;

  if (loggerType && loggerType === 'json') {
    app.useLogger(new JsonModeLogger());
  } else if (loggerType && loggerType === 'tskv') {
    app.useLogger(new TskvLogger());
  } else {
    app.useLogger(new DevModeLogger());
  }
  await app.listen(3000);
}
bootstrap();
