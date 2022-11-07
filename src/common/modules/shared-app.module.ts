import { Module } from '@nestjs/common';

import { BasicAuthModule } from './basic-auth/basic-auth.module';
import { UploadModule } from './upload/upload.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [BasicAuthModule, UploadModule, AnalyticsModule],
  providers: [],
})
export class SharedAppModule {}
