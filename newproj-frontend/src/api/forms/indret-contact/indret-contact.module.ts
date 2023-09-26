/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { IndretContactListModule } from './list/list.module';
import { IndretContactCreateModule } from './create/create.module';
import { IndretContactReadModule } from './read/read.module';
import { IndretContactUpdateModule } from './update/update.module';
import { IndretContactPartialUpdateModule } from './partialUpdate/partialUpdate.module';

@NgModule({
  imports: [
    IndretContactListModule,
    IndretContactCreateModule,
    IndretContactReadModule,
    IndretContactUpdateModule,
    IndretContactPartialUpdateModule,
  ],
  exports: [
    IndretContactListModule,
    IndretContactCreateModule,
    IndretContactReadModule,
    IndretContactUpdateModule,
    IndretContactPartialUpdateModule,
  ],
})
export class IndretContactFormModule {}
