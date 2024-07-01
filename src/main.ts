import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //request 보안을 위한 처리
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, //데이터 형변환처리
    }),
  );
  app.enableCors({
    //cors허용
    origin: true,
    credentials: true,
  });
  await app.listen(8000);
}
bootstrap();
