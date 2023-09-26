/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { ActionloggingListModule } from './list/list.module';
import { ActionloggingReadModule } from './read/read.module';

@NgModule({
  imports: [
    ActionloggingListModule,
    ActionloggingReadModule,
  ],
  exports: [
    ActionloggingListModule,
    ActionloggingReadModule,
  ],
})
export class ActionloggingFormModule {}
