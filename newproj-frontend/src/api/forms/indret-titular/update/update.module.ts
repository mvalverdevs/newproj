/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretTitularService} from '../../../controllers/IndretTitular';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretTitularUpdateFormService} from './update.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretTitularService,
    IndretTitularUpdateFormService,
  ],
})
export class IndretTitularUpdateModule {}
