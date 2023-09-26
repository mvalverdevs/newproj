/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretCircuitService} from '../../../controllers/IndretCircuit';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretCircuitReadFormService} from './read.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretCircuitService,
    IndretCircuitReadFormService,
  ],
})
export class IndretCircuitReadModule {}
