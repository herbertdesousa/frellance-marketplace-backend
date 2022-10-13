import { Injectable } from '@nestjs/common';

import { Categories } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Categories> {
    return await this.prisma.categories.findFirst({ where: { id } });
  }

  async findAttributes(categoryId: string) {
    return await this.prisma.categoryAttribute.findMany({
      where: { categoryId },
      include: { attribute: { include: { AttributeValues: true } } },
    });
  }

  async findAll(): Promise<Categories[]> {
    return await this.prisma.categories.findMany();
  }
}
