/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {ActionloggingService} from '../../../controllers/Actionlogging';
import {FormsSharedModule} from '../../forms-shared.module';
import {ActionloggingListFormService} from './list.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    ActionloggingService,
    ActionloggingListFormService,
  ],
})
export class ActionloggingListModule {}
