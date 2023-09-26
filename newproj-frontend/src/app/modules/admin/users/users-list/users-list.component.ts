import {Component} from '@angular/core';
import {UsersTableComponent} from "../users-table/users-table.component";
import {UsersModule} from "../users.module";
import {AppUtilsModule} from "../../../../utils/utils.module";
import {AuthService} from "../../../../utils/auth.service";
import {PermissionsPermissionsFormService} from "../../../../../api/forms/permissions/permissions/permissions.service";
import {PermissionsService} from "../../../../../api/controllers/Permissions";
import {GeneralMasterTablesListFormService} from "../../../../../api/forms/general-master-tables/list/list.service";
@Component({
    selector: 'app-users-list',
    standalone: true,
    templateUrl: './users-list.component.html',
    imports: [
        UsersTableComponent,
        UsersModule,
        AppUtilsModule
    ],
    providers: [
        AuthService,
        PermissionsPermissionsFormService,
        PermissionsService,
        GeneralMasterTablesListFormService
    ],
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

}


