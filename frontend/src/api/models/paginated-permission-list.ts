/* tslint:disable */
/* eslint-disable */
import { Permission } from '../models/permission';
export interface PaginatedPermissionList {
  count?: number;
  next?: null | string;
  previous?: null | string;
  results?: Array<Permission>;
}
