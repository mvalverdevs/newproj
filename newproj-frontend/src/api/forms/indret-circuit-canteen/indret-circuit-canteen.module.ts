/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { IndretCircuitCanteenListModule } from './list/list.module';
import { IndretCircuitCanteenCreateModule } from './create/create.module';
import { IndretCircuitCanteenReadModule } from './read/read.module';
import { IndretCircuitCanteenUpdateModule } from './update/update.module';
import { IndretCircuitCanteenPartialUpdateModule } from './partialUpdate/partialUpdate.module';

@NgModule({
  imports: [
    IndretCircuitCanteenListModule,
    IndretCircuitCanteenCreateModule,
    IndretCircuitCanteenReadModule,
    IndretCircuitCanteenUpdateModule,
    IndretCircuitCanteenPartialUpdateModule,
  ],
  exports: [
    IndretCircuitCanteenListModule,
    IndretCircuitCanteenCreateModule,
    IndretCircuitCanteenReadModule,
    IndretCircuitCanteenUpdateModule,
    IndretCircuitCanteenPartialUpdateModule,
  ],
})
export class IndretCircuitCanteenFormModule {}
