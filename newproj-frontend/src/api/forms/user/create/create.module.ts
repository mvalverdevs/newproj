/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {UserService} from '../../../controllers/User';
import {FormsSharedModule} from '../../forms-shared.module';
import {UserCreateFormService} from './create.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    UserService,
    UserCreateFormService,
  ],
})
export class UserCreateModule {}
