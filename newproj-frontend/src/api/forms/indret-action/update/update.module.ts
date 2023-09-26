/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretActionService} from '../../../controllers/IndretAction';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretActionUpdateFormService} from './update.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretActionService,
    IndretActionUpdateFormService,
  ],
})
export class IndretActionUpdateModule {}
