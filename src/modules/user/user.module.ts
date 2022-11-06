import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

import { UserContactModule } from './user-contact/user-contact.module';
import { UserPreferencesModule } from './user-preferences/user-preferences.module';

@Module({
  imports: [
    UserContactModule,
    UserPreferencesModule,
    NestjsFormDataModule.config({ storage: FileSystemStoredFile }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
