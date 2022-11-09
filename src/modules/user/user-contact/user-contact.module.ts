import { Module } from '@nestjs/common';

import { AnalyticsModule } from 'src/common/modules/services/analytics/analytics.module';
import { UserContactController } from './user-contact.controller';
import { UserContactService } from './user-contact.service';

@Module({
  imports: [AnalyticsModule],
  controllers: [UserContactController],
  providers: [UserContactService],
})
export class UserContactModule {}
