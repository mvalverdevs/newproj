/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretActionService} from '../../../controllers/IndretAction';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretActionListFormService} from './list.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretActionService,
    IndretActionListFormService,
  ],
})
export class IndretActionListModule {}
