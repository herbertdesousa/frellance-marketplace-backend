import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/modules/config/prisma/prisma.service';
import { ReqSaveAttribute } from 'src/dtos/modules/categories-attributes/req-save-attribute';

@Injectable()
export class AttributesService {
  constructor(private prisma: PrismaService) {}

  async create(payload: ReqSaveAttribute) {
    return await this.prisma.attributes.create({
      data: {
        name: payload.name,
        type: payload.type,
        description: payload.description,
        CategoryAttribute: {
          create: {
            categoryId: payload.category_id,
            required: payload.required,
            order: payload.order,
          },
        },
        AttributeValues: {
          createMany: {
            data: payload.values.map((i) => ({ name: i.name, default: true })),
          },
        },
      },
    });
  }

  async update(attributeId: string, payload: ReqSaveAttribute) {
    const categoryAttribute =
      await this.prisma.categoryAttribute.findFirstOrThrow({
        where: { attributesId: attributeId },
      });

    return await this.prisma.attributes.update({
      where: { id: attributeId },
      data: {
        name: payload.name,
        type: payload.type,
        description: payload.description,
        CategoryAttribute: {
          update: {
            data: {
              required: payload.required,
              order: payload.order,
            },
            where: { id: categoryAttribute.id },
          },
        },
        AttributeValues: {
          createMany: {
            data: payload.values.map((i) => ({ name: i.name, default: true })),
          },
        },
      },
    });
  }

  async deleteValuesById(id: string) {
    return await this.prisma.attributeValues.deleteMany({
      where: { attributesId: id },
    });
  }

  async delete(id: string) {
    return await this.prisma.attributes.delete({ where: { id } });
  }
}
