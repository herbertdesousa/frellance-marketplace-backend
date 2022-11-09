import { Controller, Get } from '@nestjs/common';
import { AdminContacts } from '@prisma/client';

import { AdminContactService } from 'src/common/modules/services/admin-contact/admin-contact.service';

@Controller('contacts')
export class ContactsController {
  constructor(private adminContactsService: AdminContactService) {}

  @Get()
  async list(): Promise<AdminContacts[]> {
    return await this.adminContactsService.findAll();
  }
}
