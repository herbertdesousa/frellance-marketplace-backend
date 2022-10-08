import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserContacts } from '@prisma/client';
import { ExistsOnTable } from 'src/common/validations/ExistsOnTable';
import { FirebaseUserDto } from 'src/dtos/firebase-user.dto';

import { SaveUserContactDto } from './dto/save-user-contact';
import { UserContactService } from './user-contact.service';

@Controller('users/contacts')
export class UserContactController {
  constructor(private userContactService: UserContactService) {}

  @Post()
  async create(
    @Body('user') user: FirebaseUserDto,
    @Body() data: SaveUserContactDto,
  ): Promise<UserContacts> {
    return await this.userContactService.create(user.uid, data);
  }

  @Get()
  async listAll(@Body('user') user: FirebaseUserDto): Promise<UserContacts[]> {
    return await this.userContactService.findAll(user.uid);
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
    const all = await this.userContactService.findAll(user.uid);

    if (all.length <= 1)
      throw new UnprocessableEntityException({
        error: 'necessário ao menos um contato',
      });

    return await this.userContactService.delete(id);
  }
}
