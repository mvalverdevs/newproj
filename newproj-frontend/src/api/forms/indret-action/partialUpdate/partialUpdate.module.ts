/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretActionService} from '../../../controllers/IndretAction';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretActionPartialUpdateFormService} from './partialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretActionService,
    IndretActionPartialUpdateFormService,
  ],
})
export class IndretActionPartialUpdateModule {}
