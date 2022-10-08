import { Module } from '@nestjs/common';

import { UserContactController } from './user-contact.controller';
import { UserContactService } from './user-contact.service';

@Module({
  imports: [],
  controllers: [UserContactController],
  providers: [UserContactService],
})
export class UserContactModule {}
