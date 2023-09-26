/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { UserListModule } from './list/list.module';
import { UserCreateModule } from './create/create.module';
import { UserLoginModule } from './login/login.module';
import { UserLogoutModule } from './logout/logout.module';
import { UserResetConfirmPasswordModule } from './resetConfirmPassword/resetConfirmPassword.module';
import { UserResetPasswordModule } from './resetPassword/resetPassword.module';
import { UserReadModule } from './read/read.module';
import { UserUpdateModule } from './update/update.module';
import { UserPartialUpdateModule } from './partialUpdate/partialUpdate.module';

@NgModule({
  imports: [
    UserListModule,
    UserCreateModule,
    UserLoginModule,
    UserLogoutModule,
    UserResetConfirmPasswordModule,
    UserResetPasswordModule,
    UserReadModule,
    UserUpdateModule,
    UserPartialUpdateModule,
  ],
  exports: [
    UserListModule,
    UserCreateModule,
    UserLoginModule,
    UserLogoutModule,
    UserResetConfirmPasswordModule,
    UserResetPasswordModule,
    UserReadModule,
    UserUpdateModule,
    UserPartialUpdateModule,
  ],
})
export class UserFormModule {}
