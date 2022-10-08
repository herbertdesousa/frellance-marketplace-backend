import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'src/common/services/prisma/prisma.module';
import { DecodeFirebaseTokenMiddleware } from 'src/common/middlewares/decodeFirebaseToken';
import { ExistsOnTableRule } from 'src/common/validations/ExistsOnTable';

import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, UserModule],
  controllers: [],
  providers: [ExistsOnTableRule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecodeFirebaseTokenMiddleware).forRoutes('users');
  }
}
