/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretService} from '../../../controllers/Indret';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretReadFormService} from './read.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretService,
    IndretReadFormService,
  ],
})
export class IndretReadModule {}
