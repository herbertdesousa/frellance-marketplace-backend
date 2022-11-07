import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [AuthModule, UploadModule, AnalyticsModule],
  providers: [],
})
export class SharedAppModule {}
