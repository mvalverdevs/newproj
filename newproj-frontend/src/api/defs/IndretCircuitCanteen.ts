/* tslint:disable:max-line-length */

import * as __model from '../model';

export interface IndretCircuitCanteen {
  id?: number;
  management_company?: __model.IndretCompany;
  supply_company?: __model.IndretCompany;
  ages?: AgesIndretCircuitCanteenEnum[];
  feeding_bottle_childs?: number;
  menu_per_turn?: number;
  reception_hours?: string;
  has_donations?: boolean;
  is_attached_to_project?: boolean;
  project_name?: string;
  is_supply_intern?: boolean;
  is_supply_extern?: boolean;
  type_supply_company?: Type_supply_companyIndretCircuitCanteenEnum;
  type_supply?: Type_supplyIndretCircuitCanteenEnum;
  is_internal_management?: boolean;
  supplies_others?: boolean;
  other_supply_companies?: Other_supply_companiesIndretCircuitCanteenEnum;
  number_lunch_menus?: number;
  number_diner_menus?: number;
  week_days?: Week_daysIndretCircuitCanteenEnum[];
}

export type AgesIndretCircuitCanteenEnum =
  '0-3' |
  '4-6' |
  '7-9' |
  '9-12';

export type Type_supply_companyIndretCircuitCanteenEnum =
  'central_kitchen' |
  'commercial_restaurant' |
  'social_restoration' |
  'subtitle' |
  'supply_company';

export type Type_supplyIndretCircuitCanteenEnum =
  'cold_line' |
  'warm_up' |
  'frozen';

export type Other_supply_companiesIndretCircuitCanteenEnum =
  'same_ownership' |
  'marginality' |
  'with_rsipac';

export type Week_daysIndretCircuitCanteenEnum =
  'lun' |
  'mar' |
  'mie' |
  'jue' |
  'vie' |
  'sab' |
  'dom';
