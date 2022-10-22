import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from 'src/common/services/prisma/prisma.module';
import { DecodeFirebaseTokenMiddleware } from 'src/common/middlewares/decodeFirebaseToken';
import { ExistsOnTableRule } from 'src/common/validations/ExistsOnTable';

import { UserModule } from './user/user.module';
import { CategoriesModule } from './categories/categories.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { OptionalDecodeFirebaseToken } from 'src/common/middlewares/OptionalDecodeFirebaseToken';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AnalyticsModule,
    UserModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [ExistsOnTableRule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecodeFirebaseTokenMiddleware)
      .exclude('users/contacts/item');
    consumer
      .apply(OptionalDecodeFirebaseToken)
      .forRoutes('users/contacts/item');
    consumer.apply(DecodeFirebaseTokenMiddleware).forRoutes(
      {
        path: '/users',
        method: RequestMethod.ALL,
      },
      {
        path: '/users/preferences',
        method: RequestMethod.ALL,
      },
      {
        path: '/users/name',
        method: RequestMethod.ALL,
      },
      {
        path: '/users/user_notification_on_chat_messages',
        method: RequestMethod.ALL,
      },
      {
        path: '/users/contacts',
        method: RequestMethod.ALL,
      },
      {
        path: '/categories/items',
        method: RequestMethod.POST || RequestMethod.DELETE,
      },
      {
        path: 'categories/items/details/analytics',
        method: RequestMethod.GET,
      },
      {
        path: 'categories/items/user',
        method: RequestMethod.GET,
      },
      {
        path: 'categories/items/favorited',
        method: RequestMethod.GET,
      },
      'analytics',
    );
  }
}
