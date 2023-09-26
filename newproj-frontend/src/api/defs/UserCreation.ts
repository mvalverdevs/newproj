/* tslint:disable:max-line-length */

export interface UserCreation {
  id?: number;
  /** format: date-time */
  last_login?: string;
  /** Designates that this user has all permissions without explicitly assigning them. */
  is_superuser?: boolean;
  username?: string;
  password?: string;
  /** format: email */
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  mobile_phone?: string;
  department?: string;
  charge?: string;
  registration_number?: string;
  is_inspector?: boolean;
  is_active?: boolean;
  weekly_inspections?: number;
  company_name?: string;
  /** format: date-time */
  date_joined?: string;
  /** format: date-time */
  deactivation_datetime?: string;
  login_attempts?: number;
  /** format: date-time */
  last_bad_login_attempt_datetime?: string;
  /** The groups this user belongs to. A user will get all permissions granted to each of their groups. */
  groups?: number[];
  /** Specific permissions for this user. */
  user_permissions?: number[];
  roles: number[];
  reference_in?: number[];
}
