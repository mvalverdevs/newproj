/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {GeneralMasterTablesService} from '../../../controllers/GeneralMasterTables';
import {FormsSharedModule} from '../../forms-shared.module';
import {GeneralMasterTablesPartialUpdateFormService} from './partialUpdate.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    GeneralMasterTablesService,
    GeneralMasterTablesPartialUpdateFormService,
  ],
})
export class GeneralMasterTablesPartialUpdateModule {}
