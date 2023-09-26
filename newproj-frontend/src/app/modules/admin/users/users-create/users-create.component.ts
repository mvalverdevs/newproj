import {Component} from '@angular/core';
import {FormsSharedModule} from "api/forms/forms-shared.module";
import {UsersModule} from "../users.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {UsersFormComponent} from "../users-form/users-form.component";
import {GoBackButtonComponent} from "@bcn/components/go-back-button/go-back-button.component";
import {GeneralMasterTablesService} from "../../../../../api/controllers/GeneralMasterTables";
import {GeneralMasterTablesListFormService} from "../../../../../api/forms/general-master-tables/list/list.service";

@Component({
    selector: 'app-users-create',
    standalone:true,
    imports: [
        FormsSharedModule,
        UsersModule,
        MatFormFieldModule,
        MatInputModule,
        UsersFormComponent,
        GoBackButtonComponent,
    ],
    providers: [
        GeneralMasterTablesListFormService,
        GeneralMasterTablesService
    ],
    templateUrl: './users-create.component.html',
    styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent {

}
