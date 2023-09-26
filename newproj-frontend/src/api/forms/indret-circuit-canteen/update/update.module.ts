/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretCircuitCanteenService} from '../../../controllers/IndretCircuitCanteen';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretCircuitCanteenUpdateFormService} from './update.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretCircuitCanteenService,
    IndretCircuitCanteenUpdateFormService,
  ],
})
export class IndretCircuitCanteenUpdateModule {}
