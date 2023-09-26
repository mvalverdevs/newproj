/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {IndretCompanyService} from '../../../controllers/IndretCompany';
import {FormsSharedModule} from '../../forms-shared.module';
import {IndretCompanyCreateFormService} from './create.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    IndretCompanyService,
    IndretCompanyCreateFormService,
  ],
})
export class IndretCompanyCreateModule {}
