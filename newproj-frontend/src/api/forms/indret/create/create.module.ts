/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretService} from '../../../controllers/Indret';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretCreateFormService} from './create.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretService,
    IndretCreateFormService,
  ],
})
export class IndretCreateModule {}
