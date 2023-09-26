/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {ActionloggingService} from '../../../controllers/Actionlogging';
import {FormsSharedModule} from '../../forms-shared.module';
import {ActionloggingReadFormService} from './read.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    ActionloggingService,
    ActionloggingReadFormService,
  ],
})
export class ActionloggingReadModule {}
