import { Module } from '@nestjs/common';

import { CommonConfigModule } from './config/common-config.module';
import { CommonServicesModule } from './services/common-services.module';

@Module({
  imports: [CommonConfigModule, CommonServicesModule],
  providers: [],
})
export class CommonModule {}
