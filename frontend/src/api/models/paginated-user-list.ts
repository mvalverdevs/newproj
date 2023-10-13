/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface PaginatedUserList {
  count?: number;
  next?: null | string;
  previous?: null | string;
  results?: Array<User>;
}
