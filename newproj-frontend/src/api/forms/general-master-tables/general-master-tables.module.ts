/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { GeneralMasterTablesListModule } from './list/list.module';
import { GeneralMasterTablesCreateModule } from './create/create.module';
import { GeneralMasterTablesGetBehaviourIdsModule } from './getBehaviourIds/getBehaviourIds.module';
import { GeneralMasterTablesTypesModule } from './types/types.module';
import { GeneralMasterTablesReadModule } from './read/read.module';
import { GeneralMasterTablesUpdateModule } from './update/update.module';
import { GeneralMasterTablesPartialUpdateModule } from './partialUpdate/partialUpdate.module';
import { GeneralMasterTablesDeleteModule } from './delete/delete.module';

@NgModule({
  imports: [
    GeneralMasterTablesListModule,
    GeneralMasterTablesCreateModule,
    GeneralMasterTablesGetBehaviourIdsModule,
    GeneralMasterTablesTypesModule,
    GeneralMasterTablesReadModule,
    GeneralMasterTablesUpdateModule,
    GeneralMasterTablesPartialUpdateModule,
    GeneralMasterTablesDeleteModule,
  ],
  exports: [
    GeneralMasterTablesListModule,
    GeneralMasterTablesCreateModule,
    GeneralMasterTablesGetBehaviourIdsModule,
    GeneralMasterTablesTypesModule,
    GeneralMasterTablesReadModule,
    GeneralMasterTablesUpdateModule,
    GeneralMasterTablesPartialUpdateModule,
    GeneralMasterTablesDeleteModule,
  ],
})
export class GeneralMasterTablesFormModule {}
