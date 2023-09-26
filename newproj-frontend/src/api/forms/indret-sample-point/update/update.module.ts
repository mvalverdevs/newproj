/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretSamplePointService} from '../../../controllers/IndretSamplePoint';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretSamplePointUpdateFormService} from './update.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretSamplePointService,
    IndretSamplePointUpdateFormService,
  ],
})
export class IndretSamplePointUpdateModule {}
