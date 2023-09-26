/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretService} from '../../../controllers/Indret';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretPartialUpdateFormService} from './partialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretService,
    IndretPartialUpdateFormService,
  ],
})
export class IndretPartialUpdateModule {}
