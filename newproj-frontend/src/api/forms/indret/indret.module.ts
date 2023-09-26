/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { IndretListModule } from './list/list.module';
import { IndretCreateModule } from './create/create.module';
import { IndretReadModule } from './read/read.module';
import { IndretUpdateModule } from './update/update.module';
import { IndretPartialUpdateModule } from './partialUpdate/partialUpdate.module';

@NgModule({
  imports: [
    IndretListModule,
    IndretCreateModule,
    IndretReadModule,
    IndretUpdateModule,
    IndretPartialUpdateModule,
  ],
  exports: [
    IndretListModule,
    IndretCreateModule,
    IndretReadModule,
    IndretUpdateModule,
    IndretPartialUpdateModule,
  ],
})
export class IndretFormModule {}
