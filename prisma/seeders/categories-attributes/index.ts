import { PrismaClient } from '@prisma/client';

import { attributes, categories } from './data';

import { AttributesDataSectableOrBoth, AttributesPaths } from './types';

const prisma = new PrismaClient();

type AttributesIds = { [key in AttributesPaths]: string };
async function main() {
  const attributesId: AttributesIds = {} as AttributesIds;
  for (let i = 0; i < attributes.length; i++) {
    const uptAttributes: { val: AttributesDataSectableOrBoth['values'] } = {
      val: [],
    };

    if (attributes[i].type === 'writable') {
      uptAttributes.val = [];
    } else {
      uptAttributes.val = (
        attributes[i] as AttributesDataSectableOrBoth
      ).values.map((item) => ({ ...item, default: true }));
    }

    const attribute = await prisma.attributes.create({
      data: {
        name: attributes[i].name,
        type: attributes[i].type,
        AttributeValues: {
          createMany: {
            data: uptAttributes.val,
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

    const { attributes: _, ...rest } = categories[i];

    await prisma.categories.create({
      data: {
        ...rest,
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
