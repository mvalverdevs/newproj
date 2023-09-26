/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {UserService} from '../../../controllers/User';
import {FormsSharedModule} from '../../forms-shared.module';
import {UserResetPasswordFormService} from './resetPassword.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    UserService,
    UserResetPasswordFormService,
  ],
})
export class UserResetPasswordModule {}
