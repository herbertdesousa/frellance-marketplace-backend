import { Injectable } from '@nestjs/common';

import {
  Attributes,
  AttributeValues,
  Categories,
  CategoryAttribute,
  Items,
} from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

import { SaveItemDto } from './dto/save-item';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    payload: SaveItemDto,
    attributesValuesId: string[],
  ): Promise<Items> {
    return await this.prisma.items.create({
      data: {
        userId,
        name: payload.name,
        description: payload.description,
        categoryId: payload.category_id,
        ItemPicture: {
          createMany: { data: payload.imgs.map((item) => ({ url: item })) },
        },
        ItemAttributeValues: {
          createMany: {
            data: attributesValuesId.map((id) => ({
              attributeValuesId: id,
            })),
          },
        },
      },
    });
  }

  async createAttributeValue(
    attributesId: string,
    name: string,
  ): Promise<AttributeValues> {
    return await this.prisma.attributeValues.create({
      data: { attributesId, name },
    });
  }

  async findCategoryById(id: string): Promise<Categories> {
    return await this.prisma.categories.findFirst({ where: { id } });
  }

  async findAttributesByCategoryId(categoryId: string) {
    return await this.prisma.categoryAttribute.findMany({
      where: { categoryId },
      include: { attribute: { include: { AttributeValues: true } } },
    });
  }

  async findAllCategories(): Promise<Categories[]> {
    return await this.prisma.categories.findMany();
  }
}
