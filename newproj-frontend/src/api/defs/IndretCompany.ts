/* tslint:disable:max-line-length */

export interface IndretCompany {
  id?: number;
  name: string;
  identification?: string;
  phone?: string;
  /** format: email */
  email?: string;
  contact_person?: string;
  address?: string;
  rsipac?: string;
  rgs?: string;
  registered_office?: string;
  observations?: string;
  type_of_road_id?: string;
  type_of_road_name?: string;
  street_id?: string;
  street_name?: string;
  start_number_id?: string;
  start_number_name?: string;
  zip_code?: string;
  population?: string;
  province?: string;
}
