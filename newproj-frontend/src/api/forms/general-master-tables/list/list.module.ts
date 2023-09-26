/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {GeneralMasterTablesService} from '../../../controllers/GeneralMasterTables';
import {FormsSharedModule} from '../../forms-shared.module';
import {GeneralMasterTablesListFormService} from './list.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    GeneralMasterTablesService,
    GeneralMasterTablesListFormService,
  ],
})
export class GeneralMasterTablesListModule {}
