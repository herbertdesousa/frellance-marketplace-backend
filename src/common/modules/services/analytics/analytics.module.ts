import { Global, Module } from '@nestjs/common';

import { AnalyticsService } from './analytics.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
