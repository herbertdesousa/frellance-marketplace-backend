import { Module } from '@nestjs/common';

import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { AttributesModule } from './attributes/attributes.module';

import { CategoriesController } from './categories.controller';

@Module({
  imports: [
    NestjsFormDataModule.config({ storage: FileSystemStoredFile }),
    AttributesModule,
  ],
  controllers: [CategoriesController],
  providers: [],
})
export class CategoriesModule {}
