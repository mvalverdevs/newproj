/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretCircuitService} from '../../../controllers/IndretCircuit';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretCircuitListFormService} from './list.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretCircuitService,
    IndretCircuitListFormService,
  ],
})
export class IndretCircuitListModule {}
