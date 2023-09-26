/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {UserService} from '../../../controllers/User';
import {FormsSharedModule} from '../../forms-shared.module';
import {UserPartialUpdateFormService} from './partialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    UserService,
    UserPartialUpdateFormService,
  ],
})
export class UserPartialUpdateModule {}
