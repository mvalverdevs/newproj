/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';

import { ActionloggingFormModule } from './actionlogging/actionlogging.module';
import { DocumentLibraryFormModule } from './document-library/document-library.module';
import { GeneralMasterTablesFormModule } from './general-master-tables/general-master-tables.module';
import { IndretFormModule } from './indret/indret.module';
import { IndretActionFormModule } from './indret-action/indret-action.module';
import { IndretCircuitFormModule } from './indret-circuit/indret-circuit.module';
import { IndretCircuitCanteenFormModule } from './indret-circuit-canteen/indret-circuit-canteen.module';
import { IndretCompanyFormModule } from './indret-company/indret-company.module';
import { IndretContactFormModule } from './indret-contact/indret-contact.module';
import { IndretSamplePointFormModule } from './indret-sample-point/indret-sample-point.module';
import { IndretTitularFormModule } from './indret-titular/indret-titular.module';
import { PermissionsFormModule } from './permissions/permissions.module';
import { UserFormModule } from './user/user.module';
import { UserRoleFormModule } from './user-role/user-role.module';

@NgModule({
  imports: [
    ActionloggingFormModule,
    DocumentLibraryFormModule,
    GeneralMasterTablesFormModule,
    IndretFormModule,
    IndretActionFormModule,
    IndretCircuitFormModule,
    IndretCircuitCanteenFormModule,
    IndretCompanyFormModule,
    IndretContactFormModule,
    IndretSamplePointFormModule,
    IndretTitularFormModule,
    PermissionsFormModule,
    UserFormModule,
    UserRoleFormModule,
  ],
  exports: [
    ActionloggingFormModule,
    DocumentLibraryFormModule,
    GeneralMasterTablesFormModule,
    IndretFormModule,
    IndretActionFormModule,
    IndretCircuitFormModule,
    IndretCircuitCanteenFormModule,
    IndretCompanyFormModule,
    IndretContactFormModule,
    IndretSamplePointFormModule,
    IndretTitularFormModule,
    PermissionsFormModule,
    UserFormModule,
    UserRoleFormModule,
  ],
})
export class ApiFormsModule {}
