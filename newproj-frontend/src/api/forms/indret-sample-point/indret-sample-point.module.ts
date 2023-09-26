/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { IndretSamplePointListModule } from './list/list.module';
import { IndretSamplePointCreateModule } from './create/create.module';
import { IndretSamplePointReadModule } from './read/read.module';
import { IndretSamplePointUpdateModule } from './update/update.module';
import { IndretSamplePointPartialUpdateModule } from './partialUpdate/partialUpdate.module';

@NgModule({
  imports: [
    IndretSamplePointListModule,
    IndretSamplePointCreateModule,
    IndretSamplePointReadModule,
    IndretSamplePointUpdateModule,
    IndretSamplePointPartialUpdateModule,
  ],
  exports: [
    IndretSamplePointListModule,
    IndretSamplePointCreateModule,
    IndretSamplePointReadModule,
    IndretSamplePointUpdateModule,
    IndretSamplePointPartialUpdateModule,
  ],
})
export class IndretSamplePointFormModule {}
