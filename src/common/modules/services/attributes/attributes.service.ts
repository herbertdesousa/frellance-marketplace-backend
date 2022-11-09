import { Injectable } from '@nestjs/common';

import { Attributes, Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/modules/config/prisma/prisma.service';

@Injectable()
export class AttributesService {
  constructor(private prisma: PrismaService) {}

  async findByCategoryId<T>(
    categoryId: string,
    include?: Prisma.AttributesInclude,
  ): Promise<(Attributes & T)[]> {
    return (await this.prisma.categoryAttribute.findMany({
      where: { categoryId },
      include: {
        attribute: {
          include,
        },
      },
    })) as any;
  }

  async findAttributes(categoryId: string) {
    return await this.prisma.categoryAttribute.findMany({
      where: { categoryId },
      include: {
        attribute: {
          include: { AttributeValues: { where: { default: true } } },
        },
      },
    });
  }
}
