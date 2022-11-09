import { Injectable } from '@nestjs/common';

import { AnalyticsRequestContact, Items } from '@prisma/client';
import { PrismaService } from 'src/common/modules/config/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async findAllRequestContactFromUserId(
    id: string,
  ): Promise<AnalyticsRequestContact[]> {
    return await this.prisma.analyticsRequestContact.findMany({
      where: { userUid: id },
    });
  }

  async createRequestContact(
    itemsId: string,
    userUid?: string,
  ): Promise<AnalyticsRequestContact> {
    return await this.prisma.analyticsRequestContact.create({
      data: { userUid, itemsId },
    });
  }

  async findItemById(id: string): Promise<Items> {
    return this.prisma.items.findFirst({ where: { id } });
  }
}
