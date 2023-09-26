/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {PermissionsService} from '../../../controllers/Permissions';
import {FormsSharedModule} from '../../forms-shared.module';
import {PermissionsPermissionsFormService} from './permissions.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    PermissionsService,
    PermissionsPermissionsFormService,
  ],
})
export class PermissionsPermissionsModule {}
