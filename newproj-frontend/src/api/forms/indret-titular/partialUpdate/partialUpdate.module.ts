/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretTitularService} from '../../../controllers/IndretTitular';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretTitularPartialUpdateFormService} from './partialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretTitularService,
    IndretTitularPartialUpdateFormService,
  ],
})
export class IndretTitularPartialUpdateModule {}
