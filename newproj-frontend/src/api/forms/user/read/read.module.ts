/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {UserService} from '../../../controllers/User';
import {FormsSharedModule} from '../../forms-shared.module';
import {UserReadFormService} from './read.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    UserService,
    UserReadFormService,
  ],
})
export class UserReadModule {}
