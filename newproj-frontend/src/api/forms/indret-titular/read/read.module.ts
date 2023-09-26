/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretTitularService} from '../../../controllers/IndretTitular';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretTitularReadFormService} from './read.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretTitularService,
    IndretTitularReadFormService,
  ],
})
export class IndretTitularReadModule {}
