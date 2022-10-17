import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserFavorites, UserRecentsView } from '@prisma/client';
import { FirebaseUserDto } from 'src/dtos/firebase-user.dto';

import { UserPreferencesService } from './user-preferences.service';

@Controller('users/preferences')
export class UserPreferencesController {
  constructor(private userPreferencesService: UserPreferencesService) {}

  @Post()
  async create(
    @Body('user') user: FirebaseUserDto,
    @Query('type') type: string,
    @Query('itemId') itemId: string,
  ): Promise<UserFavorites | UserRecentsView | void> {
    if (!type)
      throw new UnprocessableEntityException({
        type: 'obrigatório',
      });
    if (!itemId)
      throw new UnprocessableEntityException({
        itemId: 'obrigatório',
      });

    if (!(await this.userPreferencesService.findItemById(itemId))) {
      throw new NotFoundException({ error: 'item não encontrado' });
    }

    if (type === 'favorites') {
      return await this.userPreferencesService.createFavorite(user.uid, itemId);
    }
    if (type === 'recent-view') {
      const finded = await this.userPreferencesService.findRecentView(
        user.uid,
        itemId,
      );
      if (!finded) {
        return await this.userPreferencesService.createRecentView(
          user.uid,
          itemId,
        );
      } else {
        await this.userPreferencesService.removeRecentView(user.uid, itemId);

        return await this.userPreferencesService.createRecentView(
          user.uid,
          itemId,
        );
      }
    }

    throw new UnprocessableEntityException({ type: 'inválido' });
  }

  @Get()
  async listAll(
    @Body('user') user: FirebaseUserDto,
    @Query('type') type: string,
  ): Promise<any[]> {
    if (!type)
      throw new UnprocessableEntityException({
        type: 'obrigatório',
      });

    if (type === 'favorites') {
      const result =
        await this.userPreferencesService.findAllFavoritesFromUserId(user.uid);

      return result.map((item) => ({
        id: item.itemId.id,
        img: item.itemId.ItemPicture[0].url,
        price: item.itemId.itemPrice.value,
        description: item.itemId.description,
      }));
    }
    if (type === 'recent-view') {
      const result =
        await this.userPreferencesService.findAllRecentsViewFromUserId(
          user.uid,
        );

      return result.map((item) => ({
        id: item.itemId.id,
        img: item.itemId.ItemPicture[0].url,
        price: item.itemId.itemPrice.value,
        description: item.itemId.description,
        favorited: !!item.itemId.UserFavorites.length,
      }));
    }

    throw new UnprocessableEntityException({ type: 'inválido' });
  }

  @Delete()
  async remove(
    @Body('user') user: FirebaseUserDto,
    @Query('type') type: string,
    @Query('itemId') itemId: string,
  ) {
    if (!type)
      throw new UnprocessableEntityException({
        type: 'obrigatório',
      });
    if (!itemId)
      throw new UnprocessableEntityException({
        itemId: 'obrigatório',
      });

    try {
      if (type === 'favorites') {
        return await this.userPreferencesService.removeFavorite(
          user.uid,
          itemId,
        );
      }
    } catch (err) {
      throw new NotFoundException({ error: 'não encontrado' });
    }

    throw new UnprocessableEntityException({ type: 'inválido' });
  }
}
