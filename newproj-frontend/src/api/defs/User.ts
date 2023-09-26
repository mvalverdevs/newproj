/* tslint:disable:max-line-length */

export interface User {
  id?: number;
  username?: string;
  /** format: email */
  email: string;
  first_name?: string;
  last_name?: string;
  roles: number[];
  phone?: string;
  mobile_phone?: string;
  department?: string;
  reference_in?: number[];
  charge?: string;
  registration_number?: string;
  is_inspector?: boolean;
  is_active?: boolean;
  weekly_inspections?: number;
  company_name?: string;
  /** format: date-time */
  deactivation_datetime?: string;
  login_attempts?: number;
  /** format: date-time */
  last_bad_login_attempt_datetime?: string;
  has_login_blocked?: string;
}
