import { Injectable } from '@nestjs/common';

import { AttributeValues, Items, Prisma, UserFavorites } from '@prisma/client';
import { PrismaService } from 'src/common/modules/config/prisma/prisma.service';

import { SaveItemDto } from './dto/save-item';

import { FindAllPayload } from './item.controller';

type CreatePayload = Omit<SaveItemDto, 'imgs'> & {
  imgs: { url: string; name: string }[];
};

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    payload: CreatePayload,
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

  async findAll(filters: FindAllPayload) {
    let pagination: { take: number; skip?: number } | undefined = undefined;

    if (filters.limit) {
      if (filters.page) {
        pagination = {
          take: Number(filters.limit),
          skip: Number(filters.limit) * Number(filters.page),
        };
      } else {
        pagination = { take: Number(filters.limit) };
      }
    }

    return await this.prisma.items.findMany({
      ...(pagination || {}),
      where: {
        name: {
          ...(filters.search ? { contains: filters.search } : {}),
          mode: 'insensitive',
        },
        ...(filters.byCategoryId ? { categoryId: filters.byCategoryId } : {}),
      },
      include: {
        itemPrice: true,
        ItemPicture: true,
        ItemAttributeValues: {
          include: {
            attributeValue: {
              include: {
                attribute: true,
              },
            },
          },
        },
        AdminItemHero: true,
      },
      orderBy: {
        ...(filters.selectMostView
          ? { UserRecentsView: { _count: 'desc' } }
          : {}),
        ...(filters.order ? { createdAt: filters.order } : {}),
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
