import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { ValidationPipe } from './common/pipes/validation.pipe';
import { PrismaService } from './common/services/prisma/prisma.service';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe());

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.enableCors();

  await app.listen(3333);
}
bootstrap();
