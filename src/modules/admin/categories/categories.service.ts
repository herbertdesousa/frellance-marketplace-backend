import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { ReqCreateCategory } from './dto/req-create-category';

type ReqSavePayload = Omit<ReqCreateCategory, 'img'> & { img_url: string };

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(payload: ReqSavePayload) {
    return await this.prisma.categories.create({
      data: {
        iconName: payload.iconName,
        relevance: Number(payload.relevance),
        slug: payload.slug,
        name: payload.name,
        img_url: payload.img_url,
      },
    });
  }

  async findOneById(id: string) {
    return await this.prisma.categories.findFirst({ where: { id } });
  }

  async update(id: string, payload: ReqSavePayload) {
    return await this.prisma.categories.update({
      where: { id },
      data: {
        iconName: payload.iconName,
        relevance: Number(payload.relevance),
        slug: payload.slug,
        name: payload.name,
        img_url: payload.img_url,
      },
    });
  }

  async delete(id: string) {
    return await this.prisma.categories.delete({ where: { id } });
  }

  async countItems(id: string) {
    return await this.prisma.items.count({
      where: { categoryId: id },
    });
  }
}
