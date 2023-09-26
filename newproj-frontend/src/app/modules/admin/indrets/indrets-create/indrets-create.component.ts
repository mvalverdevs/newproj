import {Component} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {GoBackButtonComponent} from "../../../../../@bcn/components/go-back-button/go-back-button.component";
import {UsersFormComponent} from "../../users/users-form/users-form.component";
import {IndretsFormComponent} from "../indrets-form/indrets-form.component";
import {GeneralMasterTablesListFormService} from "../../../../../api/forms/general-master-tables/list/list.service";
import {GeneralMasterTablesService} from "../../../../../api/controllers/GeneralMasterTables";
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-indrets-create',
    templateUrl: './indrets-create.component.html',
    styleUrls: ['./indrets-create.component.scss'],
    standalone: true,

    providers: [
        // GeneralMasterTablesListFormService,
        // GeneralMasterTablesService
    ],
    imports: [
        FlexModule,
        GoBackButtonComponent,
        UsersFormComponent,
        IndretsFormComponent,
        MatIconModule,
        RouterModule
    ]
})
export class IndretsCreateComponent {


    constructor(private _router:Router){

    }

    goBack(){
        this._router.navigateByUrl('indrets')
    }
}
