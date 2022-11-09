import { Global, Module } from '@nestjs/common';

import { AdminContactService } from './admin-contact.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [AdminContactService],
  exports: [AdminContactService],
})
export class AdminContactModule {}
