import { Injectable } from '@nestjs/common';

import {
  ItemPicture,
  ItemPrice,
  Items,
  UserFavorites,
  UserRecentsView,
} from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

type FindFavorites = (UserFavorites & {
  itemId: Items & {
    ItemPicture: ItemPicture[];
    itemPrice: ItemPrice;
  };
})[];
type FindRecents = (UserFavorites & {
  itemId: Items & {
    ItemPicture: ItemPicture[];
    itemPrice: ItemPrice;
    UserFavorites: UserFavorites[];
  };
})[];

@Injectable()
export class UserPreferencesService {
  constructor(private prisma: PrismaService) {}

  async findAllFavoritesFromUserId(id: string): Promise<FindFavorites> {
    return await this.prisma.userFavorites.findMany({
      where: { userUid: id },
      include: { itemId: { include: { ItemPicture: true, itemPrice: true } } },
    });
  }

  async findAllRecentsViewFromUserId(id: string): Promise<FindRecents> {
    return await this.prisma.userRecentsView.findMany({
      where: { userUid: id },
      include: {
        itemId: {
          include: {
            ItemPicture: true,
            itemPrice: true,
            UserFavorites: { where: { userUid: id } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }

  async createFavorite(
    userUid: string,
    itemsId: string,
  ): Promise<UserFavorites> {
    return await this.prisma.userFavorites.create({
      data: { userUid, itemsId },
    });
  }

  async updateDateRecentView(userUid: string, itemsId: string): Promise<void> {
    await this.prisma.userFavorites.updateMany({
      where: { userUid, itemsId },
      data: { updatedAt: new Date(Date.now()) },
    });
  }

  async createRecentView(
    userUid: string,
    itemsId: string,
  ): Promise<UserRecentsView> {
    return await this.prisma.userRecentsView.create({
      data: { userUid, itemsId },
    });
  }

  async findRecentView(
    userUid: string,
    itemsId: string,
  ): Promise<UserRecentsView> {
    return await this.prisma.userRecentsView.findFirst({
      where: { userUid, itemsId },
    });
  }

  async findItemById(id: string): Promise<Items> {
    return this.prisma.items.findFirst({ where: { id } });
  }

  async removeFavorite(userUid: string, itemsId: string) {
    await this.prisma.userFavorites.deleteMany({
      where: {
        userUid,
        itemsId,
      },
    });
  }

  async removeRecentView(userUid: string, itemsId: string) {
    await this.prisma.userRecentsView.deleteMany({
      where: {
        userUid,
        itemsId,
      },
    });
  }
}
