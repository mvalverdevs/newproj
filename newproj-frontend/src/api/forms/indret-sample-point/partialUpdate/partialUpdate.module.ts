/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretSamplePointService} from '../../../controllers/IndretSamplePoint';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretSamplePointPartialUpdateFormService} from './partialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretSamplePointService,
    IndretSamplePointPartialUpdateFormService,
  ],
})
export class IndretSamplePointPartialUpdateModule {}
