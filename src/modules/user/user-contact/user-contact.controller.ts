import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  UnprocessableEntityException,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UserContacts } from '@prisma/client';
import { FirebaseUserDto } from 'src/dtos/firebase-user.dto';

import { AnalyticsService } from 'src/modules/analytics/analytics.service';
import { SaveUserContactDto } from './dto/save-user-contact';
import { UserContactService } from './user-contact.service';

@Controller('users/contacts')
export class UserContactController {
  constructor(
    private userContactService: UserContactService,
    private analyticsService: AnalyticsService,
  ) {}

  @Post()
  async create(
    @Body('user') user: FirebaseUserDto,
    @Body() data: SaveUserContactDto,
  ): Promise<UserContacts> {
    return await this.userContactService.create(user.uid, data);
  }

  @Get()
  async listAll(
    @Body('user') user: FirebaseUserDto,
    @Query('itemId') itemId?: string,
    @Query('ownerItemUserId') ownerItemUserId?: string,
  ): Promise<UserContacts[]> {
    const finded = await this.userContactService.findAllByUserId(
      ownerItemUserId,
    );

    if (!finded) throw new NotFoundException({ error: 'não encontrado' });

    if (itemId && ownerItemUserId)
      await this.analyticsService.createRequestContact(user.uid, itemId);

    return finded;
  }

  @Put()
  async update(
    @Body('user') user: FirebaseUserDto,
    @Body() data: SaveUserContactDto,
    @Query('id') id: string,
  ): Promise<UserContacts> {
    const findedUserContact = await this.userContactService.findOneById(id);
    if (!id || !findedUserContact)
      throw new UnprocessableEntityException({ id: 'inválido' });

    return await this.userContactService.update(id, user.uid, data);
  }

  @Delete()
  async delete(
    @Body('user') user: FirebaseUserDto,
    @Query('id') id: string,
  ): Promise<UserContacts> {
    const all = await this.userContactService.findAllByUserId(user.uid);

    if (all.length <= 1)
      throw new UnprocessableEntityException({
        error: 'necessário ao menos um contato',
      });

    return await this.userContactService.delete(id);
  }
}
