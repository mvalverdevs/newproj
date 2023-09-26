/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {UserService} from '../../../controllers/User';
import {FormsSharedModule} from '../../forms-shared.module';
import {UserUpdateFormService} from './update.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    UserService,
    UserUpdateFormService,
  ],
})
export class UserUpdateModule {}
