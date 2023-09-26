/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretContactService} from '../../../controllers/IndretContact';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretContactCreateFormService} from './create.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretContactService,
    IndretContactCreateFormService,
  ],
})
export class IndretContactCreateModule {}
