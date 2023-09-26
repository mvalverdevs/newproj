/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretSamplePointService} from '../../../controllers/IndretSamplePoint';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretSamplePointReadFormService} from './read.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretSamplePointService,
    IndretSamplePointReadFormService,
  ],
})
export class IndretSamplePointReadModule {}
