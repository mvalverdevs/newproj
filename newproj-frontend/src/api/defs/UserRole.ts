/* tslint:disable:max-line-length */

export interface UserRole {
  id?: number;
  role_display: string;
  role: RoleUserRoleEnum;
}

export type RoleUserRoleEnum =
  'superadmin' |
  'admin' |
  'referent' |
  'manager' |
  'query';
