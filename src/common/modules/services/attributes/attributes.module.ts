import { Global, Module } from '@nestjs/common';

import { AttributesService } from './attributes.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [AttributesService],
  exports: [AttributesService],
})
export class AttributesModule {}
