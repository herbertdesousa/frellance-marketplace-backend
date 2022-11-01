import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminItemHero } from '@prisma/client';
import { ItemHeroService } from './item-hero.service';

@Controller('admin/item-hero')
export class ItemHeroController {
  constructor(private itemHeroService: ItemHeroService) {}

  @Post()
  @UseGuards(AuthGuard('basic'))
  async create(@Body('itemId') itemId: string): Promise<AdminItemHero> {
    if ((await this.itemHeroService.count()) >= 5)
      throw new UnprocessableEntityException({
        error: 'máximo de 5 itens na hero',
      });

    if (!itemId)
      throw new UnprocessableEntityException({
        itemId: 'obrigatório',
      });

    if (await this.itemHeroService.findByItemId(itemId))
      throw new UnprocessableEntityException({
        itemId: 'item já adicionado',
      });

    return await this.itemHeroService.create(itemId);
  }

  @Delete()
  @UseGuards(AuthGuard('basic'))
  async delete(@Query('itemId') itemId: string) {
    if (!(await this.itemHeroService.findByItemId(itemId || 'id-123')))
      throw new UnprocessableEntityException({
        itemsId: 'inválido',
      });

    return await this.itemHeroService.deleteByItemId(itemId);
  }
}
