import {
  Controller,
  Get,
  NotFoundException,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { Categories } from '@prisma/client';

import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async listAll(): Promise<Categories[]> {
    return await this.categoriesService.findAll();
  }

  @Get('attributes')
  async listAttributes(@Query('id', ParseUUIDPipe) id: string) {
    if (!(await this.categoriesService.findById(id)))
      throw new NotFoundException({ message: 'categoria não encontrada' });

    const result = await this.categoriesService.findAttributes(id);

    return await Promise.all(
      result.map(async (item) => ({
        attributes_id: item.attribute.id,
        required: item.required,
        order: item.order,
        name: item.attribute.name,
        description: item.attribute.description || '',
        type: item.attribute.type,
        class: item.attribute.refAttributeClassName,
        values: item.attribute.AttributeValues,
      })),
    );
  }
}
