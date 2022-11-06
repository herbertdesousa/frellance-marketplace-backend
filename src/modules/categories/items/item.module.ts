import { Module } from '@nestjs/common';

import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [NestjsFormDataModule.config({ storage: FileSystemStoredFile })],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
