/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { IndretCircuitListModule } from './list/list.module';
import { IndretCircuitCreateModule } from './create/create.module';
import { IndretCircuitReadModule } from './read/read.module';
import { IndretCircuitUpdateModule } from './update/update.module';
import { IndretCircuitPartialUpdateModule } from './partialUpdate/partialUpdate.module';

@NgModule({
  imports: [
    IndretCircuitListModule,
    IndretCircuitCreateModule,
    IndretCircuitReadModule,
    IndretCircuitUpdateModule,
    IndretCircuitPartialUpdateModule,
  ],
  exports: [
    IndretCircuitListModule,
    IndretCircuitCreateModule,
    IndretCircuitReadModule,
    IndretCircuitUpdateModule,
    IndretCircuitPartialUpdateModule,
  ],
})
export class IndretCircuitFormModule {}
