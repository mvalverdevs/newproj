/* tslint:disable */
/* eslint-disable */
import { RoleEnum } from '../models/role-enum';

/**
 * A ModelSerializer that takes additional arguments for
 * "fields" and "include" in order to
 * control which fields are displayed, and whether to replace simple values with
 * complex, nested serializations.
 */
export interface User {
  deactivation_datetime: null | string;
  email: string;
  first_name?: null | string;
  has_login_blocked: string;
  id: number;
  is_active?: null | boolean;
  last_bad_login_attempt_datetime: null | string;
  last_name?: null | string;
  login_attempts?: number;
  password: string;
  phone?: null | string;
  role?: RoleEnum;
  username: string;
}
