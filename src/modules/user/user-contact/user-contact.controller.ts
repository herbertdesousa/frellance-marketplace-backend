import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  UnprocessableEntityException,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { UserContacts } from '@prisma/client';
import { FirebaseUserDto } from 'src/dtos/firebase-user.dto';

import { AnalyticsService } from 'src/common/modules/analytics/analytics.service';
import { ReqListAllFromItemDTO } from './dto/req-list-all-from-item.dto';
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
  async listAll(@Body('user') user: FirebaseUserDto): Promise<UserContacts[]> {
    return await this.userContactService.findAllByUserId(user.uid);
  }

  @Get('/item')
  async listAllFromItem(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: ReqListAllFromItemDTO,
    @Body() body: { user?: FirebaseUserDto },
  ): Promise<UserContacts[]> {
    const finded = await this.userContactService.findAllByUserId(
      query.ownerItemUserId,
    );

    if (!finded) throw new NotFoundException({ error: 'não encontrado' });

    await this.analyticsService.createRequestContact(
      query.itemId,
      body?.user.uid,
    );

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
