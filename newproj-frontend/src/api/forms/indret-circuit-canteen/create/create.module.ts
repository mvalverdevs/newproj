/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretCircuitCanteenService} from '../../../controllers/IndretCircuitCanteen';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretCircuitCanteenCreateFormService} from './create.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretCircuitCanteenService,
    IndretCircuitCanteenCreateFormService,
  ],
})
export class IndretCircuitCanteenCreateModule {}
