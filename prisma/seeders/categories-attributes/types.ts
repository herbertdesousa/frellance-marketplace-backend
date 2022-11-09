import { Categories } from '@prisma/client';

export type AttributesPaths =
  // general
  | 'general/condition'
  | 'general/year'
  // address
  | 'address/state'
  | 'address/city'
  | 'address/postal_code'
  | 'address/street'
  | 'address/number'
  | 'address/complement'
  | 'address/neighborhood'
  // cars
  | 'cars/condition'
  | 'cars/fuel_type'
  | 'cars/mileage'
  | 'cars/cylinders_qty'
  | 'cars/gearbox'
  | 'cars/drive_side'
  | 'cars/end_of_license_plate'
  | 'cars/fuel_tankage_capacity'
  // real states
  | 'real-estates/beds_qty'
  | 'real-estates/baths_qty'
  | 'real-estates/sqm'
  | 'real-estates/sqm_built'
  | 'real-estates/year_built'
  | 'real-estates/property_type'
  // watches
  | 'watches/gender'
  | 'watches/case_material'
  | 'watches/dial_color'
  | 'watches/dial_shape'
  | 'watches/dial_material'
  | 'watches/strap_color'
  | 'watches/strap_shape'
  | 'watches/strap_material'
  | 'watches/movement'
  // nautical
  | 'nautical/length'
  | 'nautical/beam_length'
  | 'nautical/draft_length'
  | 'nautical/berths_qty'
  | 'nautical/engine_qty'
  | 'nautical/engine_hp'
  | 'nautical/engine_hours'
  | 'nautical/engine_brand'
  | 'nautical/cruise_speed'
  | 'nautical/max_speed'
  | 'nautical/fuel_tankage_capacity'
  | 'nautical/hull_material'
  | 'nautical/boal_type'
  // aircraft
  | 'aircraft/crew'
  | 'aircraft/capacity'
  | 'aircraft/max_weight';

type AttributesDataBase = {
  path: AttributesPaths;
  name: string;
  class: string;
  description?: string;
};
export type AttributesDataWritable = AttributesDataBase & {
  type: 'writable';
};
export type AttributesDataSectableOrBoth = AttributesDataBase & {
  type: 'selectable' | 'both';
  values: { name: string; default?: boolean }[];
};
export type AttributesData =
  | AttributesDataWritable
  | AttributesDataSectableOrBoth;

export type CategoriesData = Omit<
  Categories,
  'createdAt' | 'updatedAt' | 'id'
> & {
  attributes: {
    path: AttributesPaths;
    required: boolean;
    order: number;
  }[];
};
