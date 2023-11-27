import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({ origin: process.env.CLIENT_URL, credentials: true });

  const config = new DocumentBuilder()
    .setTitle('Melody Mingle')
    .setDescription('Perfect musicians connector')
    .setVersion('1.0')
    .addTag('katrinDev')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT, () =>
    console.log(`Server was started on port ${PORT}`),
  );
}

start();
