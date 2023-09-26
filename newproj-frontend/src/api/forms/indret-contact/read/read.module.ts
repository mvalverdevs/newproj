/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretContactService} from '../../../controllers/IndretContact';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretContactReadFormService} from './read.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretContactService,
    IndretContactReadFormService,
  ],
})
export class IndretContactReadModule {}
