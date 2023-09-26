import {Component} from '@angular/core';
import {AppCommonModule} from "../../../common.module";
import {GeneralMasterTablesFormComponent} from "../general-master-tables-form/general-master-tables-form.component";
import { GeneralMasterTablesListFormService } from 'api/form-service';
import { GeneralMasterTablesService } from 'api/controllers/GeneralMasterTables';

@Component({
    selector: 'app-general-master-tables-create',
    templateUrl: './general-master-tables-create.component.html',
    standalone: true,
    imports: [
        AppCommonModule,
        GeneralMasterTablesFormComponent,

    ],
    providers:[
        GeneralMasterTablesService,
        GeneralMasterTablesListFormService,
    ],
    styleUrls: ['./general-master-tables-create.component.scss']
})
export class GeneralMasterTablesCreateComponent {

}
