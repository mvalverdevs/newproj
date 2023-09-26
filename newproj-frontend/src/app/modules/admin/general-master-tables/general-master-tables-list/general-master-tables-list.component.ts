import {Component} from '@angular/core';
import {AppUtilsModule} from "../../../../utils/utils.module";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {UsersTableComponent} from "../../users/users-table/users-table.component";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../../utils/auth.service";
import {PermissionsPermissionsFormService} from "../../../../../api/forms/permissions/permissions/permissions.service";
import {PermissionsService} from "../../../../../api/controllers/Permissions";
import {AppCommonModule} from "../../../common.module";
import {GeneralMasterTablesTableComponent} from "../general-master-tables-table/general-master-tables-table.component";
import {MatDialog} from "@angular/material/dialog";
import {
    GeneralMasterTablesCreateComponent
} from "../general-master-tables-create/general-master-tables-create.component";

@Component({
    selector: 'app-general-master-tables-list',
    standalone: true,
    templateUrl: './general-master-tables-list.component.html',
    imports: [
        AppUtilsModule,
        FlexModule,
        MatButtonModule,
        MatIconModule,
        UsersTableComponent,
        RouterLink,
        AppCommonModule,
        GeneralMasterTablesTableComponent
    ],
    providers: [
        AuthService,
        PermissionsPermissionsFormService,
        PermissionsService,
    ],
    styleUrls: ['./general-master-tables-list.component.scss']
})
export class GeneralMasterTablesListComponent {

    reload: boolean = false;

    constructor(private authService: AuthService,
                private _dialog: MatDialog) {
    }

    createMasterTable(): void {
        this.reload = false;
        const dialogRef = this._dialog.open(GeneralMasterTablesCreateComponent, {
            width: '600px'
        });
        dialogRef.afterClosed().subscribe(result => {
            this.reload = result;
        });
    }
}
