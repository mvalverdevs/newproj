/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretActionService} from '../../../controllers/IndretAction';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretActionCreateFormService} from './create.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretActionService,
    IndretActionCreateFormService,
  ],
})
export class IndretActionCreateModule {}
