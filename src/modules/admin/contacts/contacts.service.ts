import { Injectable } from '@nestjs/common';
import { AdminContacts } from '@prisma/client';

import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { SaveAdminContact } from './dto/save-admin-contact';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async update(payload: SaveAdminContact): Promise<AdminContacts> {
    return await this.prisma.adminContacts.update({
      where: { id: payload.id },
      data: { active: payload.active, link: payload.link },
    });
  }
}
