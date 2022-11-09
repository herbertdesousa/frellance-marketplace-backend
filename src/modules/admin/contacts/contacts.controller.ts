import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminContacts } from '@prisma/client';

import { AdminContactService } from 'src/common/modules/services/admin-contact/admin-contact.service';

import { SaveAdminContact } from './dto/save-admin-contact';

@Controller('admin/contacts')
export class ContactsController {
  constructor(private adminContactsService: AdminContactService) {}

  @Put()
  @UseGuards(AuthGuard('basic'))
  async update(@Body() body: SaveAdminContact): Promise<AdminContacts> {
    return await this.adminContactsService.update(body);
  }
}
