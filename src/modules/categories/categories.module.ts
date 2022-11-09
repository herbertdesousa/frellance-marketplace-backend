import { Module } from '@nestjs/common';

import { CategoriesController } from './categories.controller';
import { ItemModule } from './items/item.module';

@Module({
  imports: [ItemModule],
  controllers: [CategoriesController],
  providers: [],
})
export class CategoriesModule {}
