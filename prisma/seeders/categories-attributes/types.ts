export type AttributesPaths =
  // general
  | 'general/price_type'
  | 'general/price'
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
  | 'cars/fuel_type'
  | 'cars/mileage'
  | 'cars/cylinders_qty'
  | 'cars/gearbox'
  | 'cars/drive_side'
  | 'cars/end_of_license_plate'
  | 'cars/fuel_tankage_capacity'
  // real states
  | 'real-states/beds_qty'
  | 'real-states/baths_qty'
  | 'real-states/sqm'
  | 'real-states/sqm_built'
  | 'real-states/year_built'
  | 'real-states/property_type'
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
export type AttributesData = (
  | {
      type: 'writable';
    }
  | {
      type: 'selectable' | 'both';
      values: { name: string }[];
    }
) &
  AttributesDataBase;

export type CategoriesData = {
  name: string;
  img: string;
  attributes: {
    path: AttributesPaths;
    required: boolean;
    order: number;
  }[];
};
