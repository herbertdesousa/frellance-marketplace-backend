import { Injectable } from '@nestjs/common';

import { CategoryAttribute, Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/modules/config/prisma/prisma.service';

@Injectable()
export class CategoriesAttributesService {
  constructor(private prisma: PrismaService) {}

  async findByCategoryId<T>(
    categoryId: string,
    include?: Prisma.CategoryAttributeInclude,
  ): Promise<(CategoryAttribute & T)[]> {
    return (await this.prisma.categoryAttribute.findMany({
      where: { categoryId },
      include,
    })) as any;
  }
}
