/* tslint:disable:max-line-length */

export interface IndretContact {
  id?: number;
  indret?: number;
  relation?: number;
  first_name: string;
  last_name: string;
  /** format: email */
  email: string;
  phone: string;
  scope_is_alimentary: boolean;
  identification?: string;
  identification_type?: Identification_typeIndretContactEnum;
  documents_accreditative?: number[];
}

export type Identification_typeIndretContactEnum =
  'dni' |
  'nie' |
  'passport';
