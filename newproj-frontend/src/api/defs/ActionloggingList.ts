/* tslint:disable:max-line-length */

import * as __model from '../model';

export interface ActionloggingList {
  count: number;
  /** format: uri */
  next?: string;
  /** format: uri */
  previous?: string;
  results: __model.LoggedAction[];
}
