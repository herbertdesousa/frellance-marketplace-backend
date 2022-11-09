import { Module } from '@nestjs/common';

import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

import { CategoriesController } from './categories.controller';
import { CategoriesService as ClientCategoriesService } from 'src/modules/categories/categories.service';
import { CategoriesService } from './categories.service';

@Module({
  imports: [NestjsFormDataModule.config({ storage: FileSystemStoredFile })],
  controllers: [CategoriesController],
  providers: [CategoriesService, ClientCategoriesService],
})
export class CategoriesModule {}
