import { Module } from '@nestjs/common';

import { AttributesController } from './attributes.controller';

@Module({
  imports: [],
  controllers: [AttributesController],
  providers: [],
})
export class AttributesModule {}
