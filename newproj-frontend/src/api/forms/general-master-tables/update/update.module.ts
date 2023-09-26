/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {GeneralMasterTablesService} from '../../../controllers/GeneralMasterTables';
import {FormsSharedModule} from '../../forms-shared.module';
import {GeneralMasterTablesUpdateFormService} from './update.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    GeneralMasterTablesService,
    GeneralMasterTablesUpdateFormService,
  ],
})
export class GeneralMasterTablesUpdateModule {}
