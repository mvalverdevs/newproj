/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretCircuitCanteenService} from '../../../controllers/IndretCircuitCanteen';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretCircuitCanteenListFormService} from './list.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretCircuitCanteenService,
    IndretCircuitCanteenListFormService,
  ],
})
export class IndretCircuitCanteenListModule {}
