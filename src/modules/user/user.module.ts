import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { UserContactModule } from './user-contact/user-contact.module';

@Module({
  imports: [UserContactModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
