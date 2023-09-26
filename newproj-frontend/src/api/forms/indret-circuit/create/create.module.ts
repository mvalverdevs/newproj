/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretCircuitService} from '../../../controllers/IndretCircuit';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretCircuitCreateFormService} from './create.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretCircuitService,
    IndretCircuitCreateFormService,
  ],
})
export class IndretCircuitCreateModule {}
