import { Module } from '@nestjs/common';

import { ExistsOnTableRule } from './ExistsOnTable';
import { NotExistsOnTableRule } from './NotExistsOnTable';

@Module({
  providers: [ExistsOnTableRule, NotExistsOnTableRule],
})
export class ValidatorModule {}
