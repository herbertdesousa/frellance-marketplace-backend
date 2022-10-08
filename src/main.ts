import { NestFactory } from '@nestjs/core';
import { PrismaService } from './common/services/prisma/prisma.service';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.enableCors();

  await app.listen(3333);
}
bootstrap();
