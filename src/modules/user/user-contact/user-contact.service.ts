import { Injectable } from '@nestjs/common';

import { UserContacts } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { SaveUserContactDto } from './dto/save-user-contact';

@Injectable()
export class UserContactService {
  constructor(private prisma: PrismaService) {}

  async create(
    uid: string,
    payload: SaveUserContactDto,
  ): Promise<UserContacts> {
    return await this.prisma.userContacts.create({
      data: {
        ...payload,
        user: { connect: { uid } },
      },
    });
  }

  async findAll(uid: string): Promise<UserContacts[]> {
    return await this.prisma.userContacts.findMany({
      where: { userId: uid },
    });
  }

  async findOneById(id: string): Promise<UserContacts> {
    return await this.prisma.userContacts.findFirst({
      where: { id },
    });
  }

  async update(
    id: string,
    uid: string,
    payload: SaveUserContactDto,
  ): Promise<UserContacts> {
    return await this.prisma.userContacts.update({
      where: { id },
      data: {
        ...payload,
        user: { connect: { uid } },
      },
    });
  }

  async delete(id: string): Promise<UserContacts> {
    return await this.prisma.userContacts.delete({
      where: { id },
    });
  }
}
