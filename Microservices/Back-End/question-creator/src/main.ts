import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_URL,
      retryAttempts: 5,
      retryDelay: 10,
    },
  });
  await app.startAllMicroservicesAsync();
  app.enableCors();
  await app.listen(process.env.PORT || 8080);
  Logger.log(`Application is running on ${await app.getUrl()}`);
}

bootstrap();
