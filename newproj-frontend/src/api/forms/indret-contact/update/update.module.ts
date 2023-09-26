/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretContactService} from '../../../controllers/IndretContact';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretContactUpdateFormService} from './update.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretContactService,
    IndretContactUpdateFormService,
  ],
})
export class IndretContactUpdateModule {}
