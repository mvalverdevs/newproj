/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { IndretCompanyListModule } from './list/list.module';
import { IndretCompanyCreateModule } from './create/create.module';
import { IndretCompanyReadModule } from './read/read.module';
import { IndretCompanyUpdateModule } from './update/update.module';
import { IndretCompanyPartialUpdateModule } from './partialUpdate/partialUpdate.module';

@NgModule({
  imports: [
    IndretCompanyListModule,
    IndretCompanyCreateModule,
    IndretCompanyReadModule,
    IndretCompanyUpdateModule,
    IndretCompanyPartialUpdateModule,
  ],
  exports: [
    IndretCompanyListModule,
    IndretCompanyCreateModule,
    IndretCompanyReadModule,
    IndretCompanyUpdateModule,
    IndretCompanyPartialUpdateModule,
  ],
})
export class IndretCompanyFormModule {}
