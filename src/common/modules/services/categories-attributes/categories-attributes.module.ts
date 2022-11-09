import { Global, Module } from '@nestjs/common';

import { CategoriesAttributesService } from './categories-attributes.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [CategoriesAttributesService],
  exports: [CategoriesAttributesService],
})
export class CategoriesAttributesModule {}
