import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';

import { CategoriesModule } from './categories/categories.module';
import { ContactsModule } from './contacts/contacts.module';
import { ItemHeroModule } from './item-hero/item-hero.module';

@Module({
  imports: [ItemHeroModule, ContactsModule, CategoriesModule],
  controllers: [AdminController],
  providers: [],
})
export class AdminModule {}
