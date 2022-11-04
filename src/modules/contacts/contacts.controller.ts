import { Controller, Get } from '@nestjs/common';
import { AdminContacts } from '@prisma/client';

import { ContactsService } from './contacts.service';
@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get()
  async list(): Promise<AdminContacts[]> {
    return await this.contactsService.findAll();
  }
}
