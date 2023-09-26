/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretTitularService} from '../../../controllers/IndretTitular';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretTitularListFormService} from './list.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretTitularService,
    IndretTitularListFormService,
  ],
})
export class IndretTitularListModule {}
