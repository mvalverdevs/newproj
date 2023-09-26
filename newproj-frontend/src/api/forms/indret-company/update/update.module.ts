/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretCompanyService} from '../../../controllers/IndretCompany';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretCompanyUpdateFormService} from './update.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretCompanyService,
    IndretCompanyUpdateFormService,
  ],
})
export class IndretCompanyUpdateModule {}
