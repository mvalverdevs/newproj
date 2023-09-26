/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretSamplePointService} from '../../../controllers/IndretSamplePoint';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretSamplePointListFormService} from './list.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretSamplePointService,
    IndretSamplePointListFormService,
  ],
})
export class IndretSamplePointListModule {}
