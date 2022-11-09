import { Injectable } from '@nestjs/common';
import { AdminItemHero } from '@prisma/client';

import { PrismaService } from 'src/common/modules/config/prisma/prisma.service';

@Injectable()
export class ItemHeroService {
  constructor(private prisma: PrismaService) {}

  async count(): Promise<number> {
    return await this.prisma.adminItemHero.count();
  }

  async create(itemsId: string): Promise<AdminItemHero> {
    return await this.prisma.adminItemHero.create({
      data: { itemsId: itemsId },
    });
  }

  async findByItemId(itemsId: string): Promise<AdminItemHero> {
    return await this.prisma.adminItemHero.findFirst({ where: { itemsId } });
  }

  async deleteByItemId(itemsId: string) {
    return await this.prisma.adminItemHero.deleteMany({ where: { itemsId } });
  }
}
