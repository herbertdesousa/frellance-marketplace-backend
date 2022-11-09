import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { Attributes, AttributeValues, Categories } from '@prisma/client';

import { CategoriesAttributesService } from 'src/common/modules/services/categories-attributes/categories-attributes.service';
import { CategoriesService } from 'src/common/modules/services/categories/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService,
    private categoriesAttributesService: CategoriesAttributesService,
  ) {}

  @Get()
  async listAll(): Promise<Categories[]> {
    return await this.categoriesService.findAll();
  }

  @Get('attributes')
  async listAttributes(@Query('id', ParseUUIDPipe) id: string) {
    if (!(await this.categoriesService.findById(id)))
      throw new NotFoundException({ message: 'categoria não encontrada' });

    const result = await this.categoriesAttributesService.findByCategoryId<{
      attribute: Attributes & { AttributeValues: AttributeValues[] };
    }>(id, {
      attribute: { include: { AttributeValues: { where: { default: true } } } },
    });

    console.log(result);

    return await Promise.all(
      result.map(async (item) => ({
        id: item.attribute.id,
        required: item.required,
        order: item.order,
        name: item.attribute.name,
        description: item.attribute.description || '',
        type: item.attribute.type,
        values: item.attribute.AttributeValues,
      })),
    );
  }

  @Get('/slug/:slug')
  async getBySlug(@Param('slug') slug: string): Promise<Categories> {
    const finded = await this.categoriesService.findOneBySlug(slug);

    if (!finded) throw new NotFoundException({ error: 'não encontrado' });

    return finded;
  }
}
