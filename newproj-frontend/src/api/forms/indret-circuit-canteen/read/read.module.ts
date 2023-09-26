/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretCircuitCanteenService} from '../../../controllers/IndretCircuitCanteen';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretCircuitCanteenReadFormService} from './read.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretCircuitCanteenService,
    IndretCircuitCanteenReadFormService,
  ],
})
export class IndretCircuitCanteenReadModule {}
