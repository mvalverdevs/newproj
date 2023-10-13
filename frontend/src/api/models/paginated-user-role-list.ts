/* tslint:disable */
/* eslint-disable */
import { UserRole } from '../models/user-role';
export interface PaginatedUserRoleList {
  count?: number;
  next?: null | string;
  previous?: null | string;
  results?: Array<UserRole>;
}
