/* tslint:disable */
/* eslint-disable */
import { RoleEnum } from '../models/role-enum';

/**
 * A ModelSerializer that takes additional arguments for
 * "fields" and "include" in order to
 * control which fields are displayed, and whether to replace simple values with
 * complex, nested serializations.
 */
export interface UserRole {
  id: number;
  role: RoleEnum;
  role_display: string;
}
