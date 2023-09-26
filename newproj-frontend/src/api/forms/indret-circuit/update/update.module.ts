/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretCircuitService} from '../../../controllers/IndretCircuit';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretCircuitUpdateFormService} from './update.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretCircuitService,
    IndretCircuitUpdateFormService,
  ],
})
export class IndretCircuitUpdateModule {}
