/* tslint:disable:max-line-length */

export interface ActionMinute {
  id?: number;
  source_number?: string;
  /** format: date */
  date: string;
  start_action_time: string;
  end_action_time: string;
  is_catalan?: boolean;
  action: number;
  document?: number;
}
