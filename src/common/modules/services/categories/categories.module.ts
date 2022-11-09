import { Global, Module } from '@nestjs/common';

import { CategoriesService } from './categories.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
