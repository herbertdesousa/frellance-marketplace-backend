import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { ItemHeroModule } from './item-hero/item-hero.module';

@Module({
  imports: [ItemHeroModule],
  controllers: [AdminController],
  providers: [],
})
export class AdminModule {}
