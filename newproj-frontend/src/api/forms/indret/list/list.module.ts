/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretService} from '../../../controllers/Indret';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretListFormService} from './list.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretService,
    IndretListFormService,
  ],
})
export class IndretListModule {}
