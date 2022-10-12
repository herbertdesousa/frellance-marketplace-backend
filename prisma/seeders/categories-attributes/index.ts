import { PrismaClient } from '@prisma/client';

import { attributes, categories } from './data';

import { AttributesPaths } from './types';

const prisma = new PrismaClient();

type AttributesIds = { [key in AttributesPaths]: string };
async function main() {
  const attributesId: AttributesIds = {} as AttributesIds;
  for (let i = 0; i < attributes.length; i++) {
    const attribute = await prisma.attributes.create({
      data: {
        name: attributes[i].name,
        type: attributes[i].type,
        refAttributeClass: {
          connectOrCreate: {
            create: { name: attributes[i].class },
            where: { name: attributes[i].class },
          },
        },
        AttributeValues: {
          createMany: {
            data: (attributes[i] as any)?.values || [],
          },
        },
      },
    });
    attributesId[attributes[i].path] = attribute.id;
  }

  for (let i = 0; i < categories.length; i++) {
    const attributes: { id: string; order: number; required: boolean }[] = [];

    for (let j = 0; j < categories[i].attributes.length; j++) {
      attributes.push({
        ...categories[i].attributes[j],
        id: attributesId[categories[i].attributes[j].path],
      });
    }

    await prisma.categories.create({
      data: {
        name: categories[i].name,
        img_url: categories[i].img,
        CategoryAttribute: {
          createMany: {
            data: attributes.map((i) => ({
              attributesId: i.id,
              order: i.order,
              required: i.required,
            })),
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
