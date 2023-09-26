/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {UserService} from '../../../controllers/User';
import {FormsSharedModule} from '../../forms-shared.module';
import {UserResetConfirmPasswordFormService} from './resetConfirmPassword.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    UserService,
    UserResetConfirmPasswordFormService,
  ],
})
export class UserResetConfirmPasswordModule {}
