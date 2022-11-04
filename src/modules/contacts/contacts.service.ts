import { Injectable } from '@nestjs/common';
import { AdminContacts } from '@prisma/client';

import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<AdminContacts[]> {
    return await this.prisma.adminContacts.findMany();
  }
}
