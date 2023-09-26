/* tslint:disable:max-line-length */

export interface IndretTitular {
  id?: number;
  is_legal_entity: boolean;
  identification?: string;
  first_name?: string;
  last_name?: string;
  second_last_name?: string;
  identification_type?: Identification_typeIndretTitularEnum;
  social_reason?: string;
  CIF?: string;
  /** format: date-time */
  registration_date?: string;
  /** format: date-time */
  termination_date?: string;
  primary_phone: string;
  secondary_phone?: string;
  emails?: string[];
  is_public?: boolean;
  tax_exempt?: boolean;
  group?: string;
  type_of_road_id?: string;
  type_of_road_name: string;
  street_id?: string;
  street_name: string;
  start_number_id?: string;
  start_number_name: string;
  zip_code?: string;
  population: string;
  province: string;
}

export type Identification_typeIndretTitularEnum =
  'dni' |
  'nie' |
  'passport';
