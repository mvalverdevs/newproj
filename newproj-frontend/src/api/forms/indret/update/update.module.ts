/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretService} from '../../../controllers/Indret';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretUpdateFormService} from './update.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretService,
    IndretUpdateFormService,
  ],
})
export class IndretUpdateModule {}
