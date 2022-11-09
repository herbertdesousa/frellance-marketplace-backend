import { Module } from '@nestjs/common';

import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

import { CategoriesController } from './categories.controller';

@Module({
  imports: [NestjsFormDataModule.config({ storage: FileSystemStoredFile })],
  controllers: [CategoriesController],
  providers: [],
})
export class CategoriesModule {}
