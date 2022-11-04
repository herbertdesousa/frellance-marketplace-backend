import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminContacts } from '@prisma/client';

import { ContactsService } from './contacts.service';

import { SaveAdminContact } from './dto/save-admin-contact';

@Controller('admin/contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Put()
  @UseGuards(AuthGuard('basic'))
  async update(@Body() body: SaveAdminContact): Promise<AdminContacts> {
    return await this.contactsService.update(body);
  }
}
