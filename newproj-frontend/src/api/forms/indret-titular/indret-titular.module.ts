/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { IndretTitularListModule } from './list/list.module';
import { IndretTitularCreateModule } from './create/create.module';
import { IndretTitularReadModule } from './read/read.module';
import { IndretTitularUpdateModule } from './update/update.module';
import { IndretTitularPartialUpdateModule } from './partialUpdate/partialUpdate.module';

@NgModule({
  imports: [
    IndretTitularListModule,
    IndretTitularCreateModule,
    IndretTitularReadModule,
    IndretTitularUpdateModule,
    IndretTitularPartialUpdateModule,
  ],
  exports: [
    IndretTitularListModule,
    IndretTitularCreateModule,
    IndretTitularReadModule,
    IndretTitularUpdateModule,
    IndretTitularPartialUpdateModule,
  ],
})
export class IndretTitularFormModule {}
