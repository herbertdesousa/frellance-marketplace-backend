import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { ContactsModule } from './contacts/contacts.module';
import { ItemHeroModule } from './item-hero/item-hero.module';

@Module({
  imports: [ItemHeroModule, ContactsModule],
  controllers: [AdminController],
  providers: [],
})
export class AdminModule {}
