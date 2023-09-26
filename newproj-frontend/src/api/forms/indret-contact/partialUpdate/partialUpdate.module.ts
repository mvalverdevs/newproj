/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretContactService} from '../../../controllers/IndretContact';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretContactPartialUpdateFormService} from './partialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretContactService,
    IndretContactPartialUpdateFormService,
  ],
})
export class IndretContactPartialUpdateModule {}
