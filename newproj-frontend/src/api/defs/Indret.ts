/* tslint:disable:max-line-length */

import * as __model from '../model';

export interface Indret {
  id?: number;
  documents_data?: __model.DocumentLibrary[];
  indret_contacts: __model.IndretContact[];
  identification?: string;
  id_source?: string;
  id_intern?: string;
  name?: string;
  categories?: number[];
  types?: number[];
  pncoca?: PncocaIndretEnum;
  retail_registration_number?: number;
  number_workers?: number;
  /** format: date-time */
  registration_date?: string;
  /** format: date-time */
  termination_date?: string;
  ambiental_risk?: string;
  before_1980?: boolean;
  home_deposit?: boolean;
  is_property?: boolean;
  school_code?: number;
  risk?: string;
  number_users?: number;
  water_usage?: number;
  usual_water_usage?: number;
  type_of_road_id?: string;
  type_of_road_name?: string;
  street_id?: string;
  street_name?: string;
  start_number_id?: string;
  start_number_name?: string;
  zip_code?: string;
  neighborhood_id?: string;
  neighborhood_name?: string;
  district_id?: string;
  district_name?: string;
  dev_coordinates_lat?: string;
  dev_coordinates_lon?: string;
  center?: number;
  has_deposit?: boolean;
  deposit_location?: string;
  water_origin?: Water_originIndretEnum;
  sector?: number;
  air_code?: number;
  air_hour?: string;
  air_traffic?: boolean;
  air_works_manual?: boolean;
  air_is_urban?: boolean;
  health_auth_number?: number;
  titularity?: __model.IndretTitular;
  titularity_id?: number;
  notification_person_name?: string;
  /** format: email */
  notification_email?: string;
  notification_phone?: string;
  related_indrets?: number[];
  observations?: string;
  address?: string;
  documents?: number[];
  circuits: __model.IndretCircuit[];
  is_active?: boolean;
  deactivation_reason?: string;
}

export type PncocaIndretEnum =
  'g1' |
  'g2' |
  'g3';

export type Water_originIndretEnum =
  'public' |
  'underground' |
  'regenerade';
