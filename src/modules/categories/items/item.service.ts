import { Injectable } from '@nestjs/common';

import { AttributeValues, Items, Prisma, UserFavorites } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

import { SaveItemDto } from './dto/save-item';

import { FindAllPayload } from './item.controller';

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

  // : Promise<(Items & { itemPrice: ItemPrice })[]>
  async findAll(payload: FindAllPayload) {
    return await this.prisma.items.findMany({
      ...(payload.limit ? { take: Number(payload.limit) } : {}),
      where: {
        ...(payload.byCategoryId ? { categoryId: payload.byCategoryId } : {}),
      },
      include: {
        itemPrice: true,
        ItemPicture: true,
        ItemAttributeValues: {
          where: {
            attributeValue: {
              attribute: {
                path: { in: ['address/state', 'address/city'] },
              },
            },
          },
          include: {
            attributeValue: {
              include: {
                attribute: true,
              },
            },
          },
        },
      },
      orderBy: {
        ...(payload.selectMostView
          ? { UserRecentsView: { _count: 'desc' } }
          : {}),
        ...(payload.order ? { createdAt: payload.order } : {}),
      },
    });
  }

  async findIsFavorited(
    userUid: string,
    itemsId: string,
  ): Promise<UserFavorites[]> {
    return await this.prisma.userFavorites.findMany({
      where: {
        userUid,
        itemsId,
      },
    });
  }
}
