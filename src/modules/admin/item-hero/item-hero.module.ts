import { Module } from '@nestjs/common';

import { ItemHeroController } from './item-hero.controller';
import { ItemHeroService } from './item-hero.service';

@Module({
  imports: [],
  controllers: [ItemHeroController],
  providers: [ItemHeroService],
})
export class ItemHeroModule {}
