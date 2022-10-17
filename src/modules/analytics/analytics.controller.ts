import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AnalyticsRequestContact } from '@prisma/client';
import { FirebaseUserDto } from 'src/dtos/firebase-user.dto';

import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  // async create(
  //   @Body('user') user: FirebaseUserDto,
  //   @Query('type') type: string,
  //   @Query('itemId') itemId: string,
  // ): Promise<AnalyticsRequestContact> {
  //   if (!type)
  //     throw new UnprocessableEntityException({
  //       type: 'obrigatório',
  //     });
  //   if (!itemId)
  //     throw new UnprocessableEntityException({
  //       itemId: 'obrigatório',
  //     });

  //   if (!(await this.analyticsService.findItemById(itemId))) {
  //     throw new NotFoundException({ error: 'item não encontrado' });
  //   }

  //   // if (type === 'item-view') {
  //   //   return await this.analyticsService.createItemView(user.uid, itemId);
  //   // }
  //   if (type === 'request-contact') {
  //     return await this.analyticsService.createRequestContact(user.uid, itemId);
  //   }

  //   throw new UnprocessableEntityException({ type: 'inválido' });
  // }

  @Get()
  async listAll(
    @Body('user') user: FirebaseUserDto,
    @Query('type') type: string,
  ): Promise<AnalyticsRequestContact[]> {
    if (!type)
      throw new UnprocessableEntityException({
        type: 'obrigatório',
      });
    // if (type === 'item-view') {
    //   return await this.analyticsService.findAllItemViewFromUserId(user.uid);
    // }
    if (type === 'request-contact') {
      return await this.analyticsService.findAllRequestContactFromUserId(
        user.uid,
      );
    }

    throw new UnprocessableEntityException({ type: 'inválido' });
  }
}
