/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretCompanyService} from '../../../controllers/IndretCompany';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretCompanyPartialUpdateFormService} from './partialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretCompanyService,
    IndretCompanyPartialUpdateFormService,
  ],
})
export class IndretCompanyPartialUpdateModule {}
