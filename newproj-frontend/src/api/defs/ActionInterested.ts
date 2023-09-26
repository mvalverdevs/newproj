/* tslint:disable:max-line-length */

export interface ActionInterested {
  id?: number;
  name?: string;
  interested_will?: boolean;
  is_present?: boolean;
  identification_type?: Identification_typeActionInterestedEnum;
  identification?: string;
  action: number;
  in_capacity_of?: number;
}

export type Identification_typeActionInterestedEnum =
  'dni' |
  'nie' |
  'passport';
