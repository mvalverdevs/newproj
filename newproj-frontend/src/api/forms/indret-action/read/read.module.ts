/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretActionService} from '../../../controllers/IndretAction';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretActionReadFormService} from './read.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretActionService,
    IndretActionReadFormService,
  ],
})
export class IndretActionReadModule {}
