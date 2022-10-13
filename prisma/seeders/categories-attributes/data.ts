import { AttributesData, CategoriesData } from './types';

export const attributes: AttributesData[] = [
  //#region  general
  {
    path: 'general/price_type',
    name: 'Tipo de Preço',
    class: 'Geral',
    type: 'selectable',
    values: [{ name: 'Alugar' }, { name: 'Vender' }],
  },
  {
    path: 'general/price',
    name: 'Preço',
    class: 'Geral',
    type: 'both',
    values: [{ name: 'A Combinar' }],
  },
  {
    path: 'general/condition',
    name: 'Condição',
    class: 'Geral',
    type: 'selectable',
    values: [{ name: 'Usado' }, { name: 'Novo' }, { name: 'Recondicionado' }],
  },
  {
    path: 'general/year',
    name: 'Ano',
    class: 'Geral',
    type: 'writable',
  },
  //#endregion
  //#region address
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
    path: 'address/postal_code',
    name: 'CEP',
    type: 'writable',
    class: 'Endereço',
  },
  {
    path: 'address/street',
    name: 'Nome da Rua',
    type: 'writable',
    class: 'Endereço',
  },
  {
    path: 'address/number',
    name: 'Numero',
    type: 'writable',
    class: 'Endereço',
  },
  {
    path: 'address/complement',
    name: 'Complemento',
    type: 'writable',
    class: 'Endereço',
  },
  {
    path: 'address/neighborhood',
    name: 'Bairro',
    type: 'writable',
    class: 'Endereço',
  },
  //#endregion
  //#region cars
  {
    path: 'cars/mileage',
    name: 'Km Rodados',
    description: 'Quantidade de KM Rodados pelo veículo',
    type: 'writable',
    class: 'Carro',
  },
  {
    path: 'cars/cylinders_qty',
    name: 'Motor (Cilindradas)',
    description: 'Quantidade de cilindradas este motor possui',
    type: 'writable',
    class: 'Carro',
  },
  {
    path: 'cars/gearbox',
    name: 'Câmbio',
    type: 'selectable',
    class: 'Carro',
    values: [{ name: 'Manual' }, { name: 'Automático' }],
  },
  {
    path: 'cars/drive_side',
    name: 'Lado do Motorista',
    type: 'selectable',
    class: 'Carro',
    values: [{ name: 'Direita' }, { name: 'Esquerda' }],
  },
  {
    path: 'cars/fuel_type',
    name: 'Tipo de Combúsitvel',
    type: 'selectable',
    class: 'Carro',
    values: [{ name: 'Gasolina' }, { name: 'Álcool' }, { name: 'Elétrico' }],
  },
  {
    path: 'cars/end_of_license_plate',
    name: 'Final da Placa',
    type: 'writable',
    class: 'Carro',
  },
  {
    path: 'cars/fuel_tankage_capacity',
    name: 'Capacidade do Tanque de Combúsitvel (Litros)',
    type: 'writable',
    class: 'Carro',
  },
  //#endregion
  //#region real states
  {
    path: 'real-estates/beds_qty',
    name: 'Quantidade de Quartos',
    type: 'writable',
    class: 'Imóveis',
  },
  {
    path: 'real-estates/baths_qty',
    name: 'Quantidade de Banheiros',
    type: 'writable',
    class: 'Imóveis',
  },
  {
    path: 'real-estates/sqm',
    name: 'Km Quadrados Total',
    type: 'writable',
    class: 'Imóveis',
  },
  {
    path: 'real-estates/sqm_built',
    name: 'Km Quadrados Construido',
    description: 'Total de KM Quadrados de área construida',
    type: 'writable',
    class: 'Imóveis',
  },
  {
    path: 'real-estates/year_built',
    name: 'Ano Contruido',
    type: 'writable',
    class: 'Imóveis',
  },
  {
    path: 'real-estates/property_type',
    name: 'Tipo de Residência',
    type: 'selectable',
    class: 'Imóveis',
    values: [{ name: 'Condôminio' }, { name: 'Apartamento' }, { name: 'Casa' }],
  },
  //#endregion
  //#region watches
  {
    path: 'watches/gender',
    name: 'Gênero',
    type: 'selectable',
    class: 'Relógios',
    values: [{ name: 'Masculino' }, { name: 'Feminino' }, { name: 'Unissex' }],
  },
  {
    path: 'watches/case_material',
    name: 'Material da Caixa',
    type: 'writable',
    class: 'Relógios',
  },
  {
    path: 'watches/dial_color',
    name: 'Cor do mostrador',
    type: 'writable',
    class: 'Relógios',
  },
  {
    path: 'watches/dial_shape',
    name: 'Formato do mostrador',
    type: 'writable',
    class: 'Relógios',
  },
  {
    path: 'watches/dial_material',
    name: 'Material do mostrador',
    type: 'writable',
    class: 'Relógios',
  },
  {
    path: 'watches/strap_color',
    name: 'Cor da Alça',
    type: 'writable',
    class: 'Relógios',
  },
  {
    path: 'watches/strap_shape',
    name: 'Formato da Alça',
    type: 'writable',
    class: 'Relógios',
  },
  {
    path: 'watches/strap_material',
    name: 'Material da Alça',
    type: 'writable',
    class: 'Relógios',
  },
  {
    path: 'watches/movement',
    name: 'Movimento',
    type: 'selectable',
    class: 'Relógios',
    values: [{ name: 'Manual' }, { name: 'Automático' }],
  },
  //#endregion
  //#region nautical
  {
    path: 'nautical/length',
    name: 'Tamanho Total (m)',
    type: 'writable',
    class: 'Náuticos',
  },
  {
    path: 'nautical/beam_length',
    name: 'Tamanho da Viga (m)',
    type: 'writable',
    class: 'Náuticos',
  },
  {
    path: 'nautical/draft_length',
    name: 'Tamanho do Calado (m)',
    description:
      'Comprimento a partir da quilha da embarcação ao nível de água',
    type: 'writable',
    class: 'Náuticos',
  },
  {
    path: 'nautical/berths_qty',
    name: 'Quantidade de Beliches',
    type: 'writable',
    class: 'Náuticos',
  },
  {
    path: 'nautical/engine_qty',
    name: 'Quantidade de Motor(es)',
    type: 'writable',
    class: 'Náuticos',
  },
  {
    path: 'nautical/engine_hp',
    name: 'Potência dos Motor(es)',
    type: 'writable',
    class: 'Náuticos',
  },
  {
    path: 'nautical/engine_hours',
    name: 'Horas rodadas pelo Motor',
    type: 'writable',
    class: 'Náuticos',
  },
  {
    path: 'nautical/engine_brand',
    name: 'Marca do motor',
    type: 'writable',
    class: 'Náuticos',
  },
  {
    path: 'nautical/cruise_speed',
    name: 'Velocidade de Cruzeiro (km/h)',
    type: 'writable',
    class: 'Náuticos',
  },
  {
    path: 'nautical/max_speed',
    name: 'Velocidade Máxima (km/h)',
    type: 'writable',
    class: 'Náuticos',
  },
  {
    path: 'nautical/fuel_tankage_capacity',
    name: 'Capacidade do Tanque de Combúsitvel (Litros)',
    type: 'writable',
    class: 'Náuticos',
  },
  {
    path: 'nautical/hull_material',
    name: 'Material do Casco',
    type: 'writable',
    class: 'Náuticos',
  },
  {
    path: 'nautical/boal_type',
    name: 'Tipo de embarcação',
    type: 'selectable',
    class: 'Náuticos',
    values: [{ name: 'Motor' }, { name: 'A Vela' }, { name: 'Ambos' }],
  },
  //#endregion
  //#region aircraft
  {
    path: 'aircraft/crew',
    name: 'Quantidade de Tripulantes',
    type: 'writable',
    class: 'Aeronaves',
  },
  {
    path: 'aircraft/capacity',
    name: 'Quantidade Total',
    type: 'writable',
    class: 'Aeronaves',
  },
  {
    path: 'aircraft/max_weight',
    name: 'Peso Total',
    type: 'writable',
    class: 'Aeronaves',
  },
  //#endregion
];

export const categories: CategoriesData[] = [
  {
    name: 'Carros',
    img_url:
      'https://firebasestorage.googleapis.com/v0/b/frellance-marketplace.appspot.com/o/categories%2Fcars.webp?alt=media',
    slug: 'carros',
    iconName: 'FiCreditCard',
    attributes: [
      // general
      { path: 'general/price_type', required: true, order: 3 },
      { path: 'general/price', required: true, order: 2 },
      { path: 'general/condition', required: true, order: 1 },
      { path: 'general/year', required: true, order: 0 },
      // address
      { path: 'address/state', required: true, order: 7 },
      { path: 'address/city', required: true, order: 6 },
      { path: 'address/postal_code', required: false, order: 5 },
      { path: 'address/street', required: false, order: 4 },
      { path: 'address/number', required: false, order: 3 },
      { path: 'address/complement', required: false, order: 2 },
      { path: 'address/neighborhood', required: false, order: 1 },
      // cars
      { path: 'cars/mileage', required: false, order: 0 },
      { path: 'cars/cylinders_qty', required: false, order: 0 },
      { path: 'cars/gearbox', required: false, order: 0 },
      { path: 'cars/drive_side', required: false, order: 0 },
      { path: 'cars/fuel_type', required: false, order: 0 },
      { path: 'cars/end_of_license_plate', required: false, order: 0 },
      { path: 'cars/fuel_tankage_capacity', required: false, order: 0 },
    ],
  },
  {
    name: 'Imóveis',
    img_url:
      'https://firebasestorage.googleapis.com/v0/b/frellance-marketplace.appspot.com/o/categories%2Freal-estates.webp?alt=media',
    slug: 'imoveis',
    iconName: 'FiHome',
    attributes: [
      // general
      { path: 'general/price_type', required: true, order: 2 },
      { path: 'general/price', required: true, order: 1 },
      // address
      { path: 'address/postal_code', required: true, order: 7 },
      { path: 'address/number', required: true, order: 6 },
      { path: 'address/complement', required: false, order: 5 },
      { path: 'address/street', required: true, order: 4 },
      { path: 'address/neighborhood', required: true, order: 3 },
      { path: 'address/state', required: true, order: 2 },
      { path: 'address/city', required: true, order: 1 },
      // real states
      { path: 'real-estates/beds_qty', required: true, order: 4 },
      { path: 'real-estates/baths_qty', required: true, order: 3 },
      { path: 'real-estates/sqm', required: true, order: 2 },
      { path: 'real-estates/property_type', required: true, order: 1 },
      { path: 'real-estates/sqm_built', required: false, order: 0 },
      { path: 'real-estates/year_built', required: false, order: 0 },
    ],
  },
  {
    name: 'Relógios',
    img_url:
      'https://firebasestorage.googleapis.com/v0/b/frellance-marketplace.appspot.com/o/categories%2Fwatches.webp?alt=media',
    slug: 'relogios',
    iconName: 'FiClock',
    attributes: [
      // general
      { path: 'general/price_type', required: true, order: 3 },
      { path: 'general/price', required: true, order: 2 },
      { path: 'general/condition', required: true, order: 1 },
      { path: 'general/year', required: true, order: 0 },
      // address
      { path: 'address/state', required: true, order: 7 },
      { path: 'address/city', required: true, order: 6 },
      { path: 'address/postal_code', required: false, order: 5 },
      { path: 'address/street', required: false, order: 4 },
      { path: 'address/number', required: false, order: 3 },
      { path: 'address/complement', required: false, order: 2 },
      { path: 'address/neighborhood', required: false, order: 1 },
      // watches
      { path: 'watches/gender', required: true, order: 9 },
      { path: 'watches/dial_color', required: false, order: 8 },
      { path: 'watches/dial_shape', required: false, order: 7 },
      { path: 'watches/dial_material', required: false, order: 6 },
      { path: 'watches/strap_color', required: false, order: 5 },
      { path: 'watches/strap_shape', required: false, order: 4 },
      { path: 'watches/strap_material', required: false, order: 3 },
      { path: 'watches/case_material', required: false, order: 2 },
      { path: 'watches/movement', required: false, order: 1 },
    ],
  },
  {
    name: 'Náuticos',
    img_url:
      'https://firebasestorage.googleapis.com/v0/b/frellance-marketplace.appspot.com/o/categories%2Fnautical.webp?alt=media',
    slug: 'nauticos',
    iconName: 'FiAnchor',
    attributes: [
      // general
      { path: 'general/price_type', required: true, order: 3 },
      { path: 'general/price', required: true, order: 2 },
      { path: 'general/condition', required: true, order: 1 },
      { path: 'general/year', required: true, order: 0 },
      // address
      { path: 'address/state', required: true, order: 7 },
      { path: 'address/city', required: true, order: 6 },
      { path: 'address/postal_code', required: false, order: 5 },
      { path: 'address/street', required: false, order: 4 },
      { path: 'address/number', required: false, order: 3 },
      { path: 'address/complement', required: false, order: 2 },
      { path: 'address/neighborhood', required: false, order: 1 },
      // nautical
      { path: 'nautical/length', required: true, order: 13 },
      { path: 'nautical/beam_length', required: false, order: 12 },
      { path: 'nautical/draft_length', required: false, order: 11 },
      { path: 'nautical/berths_qty', required: false, order: 10 },
      { path: 'nautical/engine_qty', required: false, order: 9 },
      { path: 'nautical/engine_hp', required: false, order: 8 },
      { path: 'nautical/engine_hours', required: false, order: 7 },
      { path: 'nautical/engine_brand', required: false, order: 6 },
      { path: 'nautical/cruise_speed', required: false, order: 5 },
      { path: 'nautical/max_speed', required: false, order: 4 },
      { path: 'nautical/fuel_tankage_capacity', required: false, order: 3 },
      { path: 'nautical/hull_material', required: false, order: 2 },
      { path: 'nautical/boal_type', required: false, order: 1 },
    ],
  },
  {
    name: 'Aeronaves',
    img_url:
      'https://firebasestorage.googleapis.com/v0/b/frellance-marketplace.appspot.com/o/categories%2Faircrafts.webp?alt=media',
    slug: 'aeronaves',
    iconName: 'FiSend',
    attributes: [
      // general
      { path: 'general/price_type', required: true, order: 3 },
      { path: 'general/price', required: true, order: 2 },
      { path: 'general/condition', required: true, order: 1 },
      { path: 'general/year', required: true, order: 0 },
      // address
      { path: 'address/state', required: true, order: 7 },
      { path: 'address/city', required: true, order: 6 },
      { path: 'address/postal_code', required: false, order: 5 },
      { path: 'address/street', required: false, order: 4 },
      { path: 'address/number', required: false, order: 3 },
      { path: 'address/complement', required: false, order: 2 },
      { path: 'address/neighborhood', required: false, order: 1 },
      // aircraft
      { path: 'aircraft/crew', required: false, order: 0 },
      { path: 'aircraft/capacity', required: false, order: 0 },
      { path: 'aircraft/max_weight', required: false, order: 0 },
    ],
  },
];
