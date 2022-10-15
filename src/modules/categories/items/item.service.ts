import { Injectable } from '@nestjs/common';

import { AttributeValues, Items, Prisma } from '@prisma/client';
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
          createMany: {
            data: payload.imgs.map((item) => ({
              url: item.url,
              name: item.name,
            })),
          },
        },
        ItemAttributeValues: {
          createMany: {
            data: attributesValuesId.map((id) => ({
              attributeValuesId: id,
            })),
          },
        },
        itemPrice: {
          create: payload.price,
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

  async findAttributesByCategoryId(categoryId: string) {
    return await this.prisma.categoryAttribute.findMany({
      where: { categoryId },
      include: {
        attribute: {
          include: { AttributeValues: true },
        },
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.items.delete({ where: { id } });
  }

  async findAllByUserId<T>(
    userId: string,
    include?: Prisma.ItemsInclude,
  ): Promise<(Items & T)[]> {
    return (await this.prisma.items.findMany({
      where: { userId },
      include,
    })) as any;
  }

  async findById<T>(
    id: string,
    include?: Prisma.ItemsInclude,
  ): Promise<Items & T> {
    return (await this.prisma.items.findFirst({
      where: { id },
      include,
    })) as any;
  }
}
