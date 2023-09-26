/* tslint:disable:max-line-length */

import * as __model from '../model';

export interface IndretCircuit {
  id?: number;
  sample_points?: __model.SamplePoint[];
  canteen?: __model.IndretCircuitCanteen;
  is_active?: boolean;
  is_canteen?: boolean;
  name?: string;
  /** format: date-time */
  registration_date?: string;
  /** format: date-time */
  termination_date?: string;
  indret?: number;
  type?: number;
  tech_responsible?: number;
}
