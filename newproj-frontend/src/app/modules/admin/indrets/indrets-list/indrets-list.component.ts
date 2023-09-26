import { Component } from '@angular/core';
import {AppUtilsModule} from "../../../../utils/utils.module";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {UsersTableComponent} from "../../users/users-table/users-table.component";
import {IndretsTableComponent} from "../indrets-table/indrets-table.component";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../../utils/auth.service";
import {PermissionsPermissionsFormService} from "../../../../../api/forms/permissions/permissions/permissions.service";
import {PermissionsService} from "../../../../../api/controllers/Permissions";

@Component({
    selector: 'app-indrets-list',
    templateUrl: './indrets-list.component.html',
    styleUrls: ['./indrets-list.component.scss'],
    standalone: true,
    imports: [
        AppUtilsModule,
        FlexModule,
        MatButtonModule,
        MatIconModule,
        UsersTableComponent,
        IndretsTableComponent,
        RouterLink,
    ],
    providers:[
        AuthService,
        PermissionsPermissionsFormService,
        PermissionsService
    ]
})
export class IndretsListComponent {

}
