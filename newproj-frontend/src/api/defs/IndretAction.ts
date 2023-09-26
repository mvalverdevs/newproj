/* tslint:disable:max-line-length */

import * as __model from '../model';

export interface IndretAction {
  id?: number;
  /** format: date-time */
  created?: string;
  /** format: date-time */
  modified?: string;
  indret_changes?: Indret_changesIndretActionEnum;
  indret?: number;
  indret_circuits: number[];
  type_is_alimentary: boolean;
  status?: StatusIndretActionEnum;
  planning_period?: Planning_periodIndretActionEnum;
  deactivation_reason?: Deactivation_reasonIndretActionEnum;
  other_reasons?: string;
  creator?: number;
  is_presencial: boolean;
  /** format: date */
  date_scheduled: string;
  /** format: date */
  action_date: string;
  inspection_reason?: number;
  action_type?: number;
  rate?: number;
  observations?: string;
  technicians?: number[];
  id_action?: string;
  samples_number?: string;
  minute?: __model.ActionMinute;
  interested?: __model.ActionInterested;
  documents: __model.ActionDocument[];
  products: __model.ActionProduct[];
}

export type Indret_changesIndretActionEnum =
  'act_changes' |
  'titularity_change' |
  'social_address_change' |
  'industrial_address_change';

export type StatusIndretActionEnum =
  'planned' |
  'done' |
  'cancelled' |
  'pending_planning' |
  'penging_assingnment';

export type Planning_periodIndretActionEnum =
  '3m' |
  '6m' |
  '9m' |
  '12m';

export type Deactivation_reasonIndretActionEnum =
  'deactivation' |
  'titular_change' |
  'temp_closing' |
  'others';
