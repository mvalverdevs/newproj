/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretContactService} from '../../../controllers/IndretContact';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretContactListFormService} from './list.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretContactService,
    IndretContactListFormService,
  ],
})
export class IndretContactListModule {}
