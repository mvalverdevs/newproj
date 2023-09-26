/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import {GeneralMasterTablesService} from '../../../controllers/GeneralMasterTables';
import {FormsSharedModule} from '../../forms-shared.module';
import {GeneralMasterTablesGetBehaviourIdsFormService} from './getBehaviourIds.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    GeneralMasterTablesService,
    GeneralMasterTablesGetBehaviourIdsFormService,
  ],
})
export class GeneralMasterTablesGetBehaviourIdsModule {}
