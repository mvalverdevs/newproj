/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { IndretActionListModule } from './list/list.module';
import { IndretActionCreateModule } from './create/create.module';
import { IndretActionReadModule } from './read/read.module';
import { IndretActionUpdateModule } from './update/update.module';
import { IndretActionPartialUpdateModule } from './partialUpdate/partialUpdate.module';

@NgModule({
  imports: [
    IndretActionListModule,
    IndretActionCreateModule,
    IndretActionReadModule,
    IndretActionUpdateModule,
    IndretActionPartialUpdateModule,
  ],
  exports: [
    IndretActionListModule,
    IndretActionCreateModule,
    IndretActionReadModule,
    IndretActionUpdateModule,
    IndretActionPartialUpdateModule,
  ],
})
export class IndretActionFormModule {}
