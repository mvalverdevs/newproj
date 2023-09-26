import {Component, Inject} from '@angular/core';
import {AppCommonModule} from "../../../common.module";
import {GeneralMasterTablesFormComponent} from "../general-master-tables-form/general-master-tables-form.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {UsersFormComponent} from "../../users/users-form/users-form.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GeneralMasterTablesReadFormService} from "../../../../../api/forms/general-master-tables/read/read.service";
import {FakeLoadingModule} from "../../../../../@bcn/components/fake-loading/fake-loading.module";
import {GeneralMasterTablesService} from "../../../../../api/controllers/GeneralMasterTables";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import { GeneralMasterTablesListFormService } from 'api/form-service';

@Component({
    selector: 'app-general-master-tables-edit',
    templateUrl: './general-master-tables-edit.component.html',
    styleUrls: ['./general-master-tables-edit.component.scss'],
    standalone: true,
    providers: [
        GeneralMasterTablesReadFormService,
        GeneralMasterTablesService,
        GeneralMasterTablesListFormService,
        MatSnackBar
    ],
    imports: [
        AppCommonModule,
        GeneralMasterTablesFormComponent,
        AsyncPipe,
        NgIf,
        RouterLink,
        UsersFormComponent,
        FakeLoadingModule
    ]
})
export class GeneralMasterTablesEditComponent {
    error: boolean;
    generalMasterTables: any;
    isNew: boolean;

    constructor(
        protected formService: GeneralMasterTablesReadFormService,
        private _router: Router,
        private _dialog: MatDialog,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    }

    ngOnInit() {
        this.generalMasterTables = this.data.generalMasterTables;
    }

}
