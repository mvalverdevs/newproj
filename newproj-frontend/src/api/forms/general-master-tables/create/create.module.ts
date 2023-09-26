/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {GeneralMasterTablesService} from '../../../controllers/GeneralMasterTables';
import {FormsSharedModule} from '../../forms-shared.module';
import {GeneralMasterTablesCreateFormService} from './create.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    GeneralMasterTablesService,
    GeneralMasterTablesCreateFormService,
  ],
})
export class GeneralMasterTablesCreateModule {}
