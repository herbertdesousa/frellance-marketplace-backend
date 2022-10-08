import { Injectable } from '@nestjs/common';

import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(payload: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data: payload });
  }
}
