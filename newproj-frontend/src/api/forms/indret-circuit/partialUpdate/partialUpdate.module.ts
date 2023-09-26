/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretCircuitService} from '../../../controllers/IndretCircuit';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretCircuitPartialUpdateFormService} from './partialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretCircuitService,
    IndretCircuitPartialUpdateFormService,
  ],
})
export class IndretCircuitPartialUpdateModule {}
