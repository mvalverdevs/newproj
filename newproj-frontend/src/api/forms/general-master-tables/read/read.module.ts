/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {GeneralMasterTablesService} from '../../../controllers/GeneralMasterTables';
import {FormsSharedModule} from '../../forms-shared.module';
import {GeneralMasterTablesReadFormService} from './read.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    GeneralMasterTablesService,
    GeneralMasterTablesReadFormService,
  ],
})
export class GeneralMasterTablesReadModule {}
