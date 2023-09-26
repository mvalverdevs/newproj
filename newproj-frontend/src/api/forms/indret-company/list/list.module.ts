/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretCompanyService} from '../../../controllers/IndretCompany';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretCompanyListFormService} from './list.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretCompanyService,
    IndretCompanyListFormService,
  ],
})
export class IndretCompanyListModule {}
