/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {UserRoleService} from '../../../controllers/UserRole';
import {FormsSharedModule} from '../../forms-shared.module';
import {UserRoleUserRoleFormService} from './userRole.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    UserRoleService,
    UserRoleUserRoleFormService,
  ],
})
export class UserRoleUserRoleModule {}
