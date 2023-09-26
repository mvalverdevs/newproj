/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { PermissionsPermissionsModule } from './permissions/permissions.module';

@NgModule({
  imports: [
    PermissionsPermissionsModule,
  ],
  exports: [
    PermissionsPermissionsModule,
  ],
})
export class PermissionsFormModule {}
