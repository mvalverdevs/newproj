/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretSamplePointService} from '../../../controllers/IndretSamplePoint';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretSamplePointCreateFormService} from './create.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretSamplePointService,
    IndretSamplePointCreateFormService,
  ],
})
export class IndretSamplePointCreateModule {}
