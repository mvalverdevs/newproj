/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretCircuitCanteenService} from '../../../controllers/IndretCircuitCanteen';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretCircuitCanteenPartialUpdateFormService} from './partialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretCircuitCanteenService,
    IndretCircuitCanteenPartialUpdateFormService,
  ],
})
export class IndretCircuitCanteenPartialUpdateModule {}
