import { PrismaClient, Attributes } from '@prisma/client';

const prisma = new PrismaClient();

type CategoriesData = {
  name: string;
  img: string;
  attributes: {
    path: AttributesPaths;
    required: boolean;
    order: number;
  }[];
};
const categories: CategoriesData[] = [
  {
    name: 'Carros',
    img: '/',
    attributes: [
      { path: 'address/state', required: true, order: 1 },
      { path: 'address/city', required: true, order: 0 },
      { path: 'cars/year', required: true, order: 1 },
      { path: 'cars/fuel_type', required: false, order: 0 },
    ],
  },
  {
    name: 'Imóveis',
    img: '/',
    attributes: [
      { path: 'address/state', required: true, order: 1 },
      { path: 'address/city', required: true, order: 0 },
      { path: 'real-states/beds_qty', required: true, order: 1 },
    ],
  },
];

type AttributesPaths =
  | 'address/state'
  | 'address/city'
  | 'cars/year'
  | 'cars/fuel_type'
  | 'real-states/beds_qty';
type AttributesData = {
  path: AttributesPaths;
  name: string;
  class: string;
  type: Attributes['type'];
  description?: string;
  values?: { name: string }[];
};
const attributesData: AttributesData[] = [
  {
    path: 'address/state',
    name: 'Estado',
    type: 'selectable',
    class: 'Endereço',
    values: [
      { name: 'AC' },
      { name: 'AL' },
      { name: 'AP' },
      { name: 'AM' },
      { name: 'BA' },
      { name: 'CE' },
      { name: 'DF' },
      { name: 'ES' },
      { name: 'GO' },
      { name: 'MA' },
      { name: 'MS' },
      { name: 'MT' },
      { name: 'MG' },
      { name: 'PA' },
      { name: 'PB' },
      { name: 'PR' },
      { name: 'PE' },
      { name: 'PI' },
      { name: 'RJ' },
      { name: 'RN' },
      { name: 'RS' },
      { name: 'RO' },
      { name: 'RR' },
      { name: 'SC' },
      { name: 'SP' },
      { name: 'SE' },
      { name: 'TO' },
    ],
  },
  {
    path: 'address/city',
    name: 'Cidade',
    type: 'writable',
    class: 'Endereço',
  },
  {
    path: 'cars/year',
    name: 'Ano do Veículo',
    type: 'writable',
    class: 'Carro',
  },
  {
    path: 'cars/fuel_type',
    name: 'Tipo de Combúsitvel',
    type: 'selectable',
    class: 'Carro',
    values: [{ name: 'Gasolina' }, { name: 'Álcool' }, { name: 'Elétrico' }],
  },
  {
    path: 'real-states/beds_qty',
    name: 'Quantidade de Quartos',
    type: 'writable',
    class: 'Imóveis',
  },
];

type AttributesIds = { [key in AttributesPaths]: string };

async function main() {
  const attributesId: AttributesIds = {} as AttributesIds;
  for (let i = 0; i < attributesData.length; i++) {
    const attribute = await prisma.attributes.create({
      data: {
        name: attributesData[i].name,
        type: attributesData[i].type,
        refAttributeClass: {
          connectOrCreate: {
            create: { name: attributesData[i].class },
            where: { name: attributesData[i].class },
          },
        },
        AttributeValues: {
          createMany: {
            data: attributesData[i]?.values || [],
          },
        },
      },
    });
    attributesId[attributesData[i].path] = attribute.id;
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
