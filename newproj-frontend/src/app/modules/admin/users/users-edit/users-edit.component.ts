import {Component} from '@angular/core';
import {FormsSharedModule} from "api/forms/forms-shared.module";
import {UsersModule} from "../users.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {UsersFormComponent} from "../users-form/users-form.component";
import {GoBackButtonComponent} from "@bcn/components/go-back-button/go-back-button.component";
import {FakeLoadingModule} from "@bcn/components/fake-loading/fake-loading.module";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersViewComponent} from "../users-view/users-view.component";
import {UserReadFormService} from "api/forms/user/read/read.service";
import {UserService} from "api/controllers/User";
import {UserPartialUpdateFormService} from "api/forms/user/partialUpdate/partialUpdate.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GeneralMasterTablesService} from "../../../../../api/controllers/GeneralMasterTables";
import {GeneralMasterTablesListFormService} from "../../../../../api/forms/general-master-tables/list/list.service";

@Component({
    selector: 'app-users-edit',
    standalone: true,
    imports: [
        FormsSharedModule,
        UsersModule,
        MatFormFieldModule,
        MatInputModule,
        UsersFormComponent,
        GoBackButtonComponent,
        FakeLoadingModule,
    ],
    providers: [
        UserReadFormService,
        UserService,
        UserPartialUpdateFormService,
        MatSnackBar,
        GeneralMasterTablesService,
        GeneralMasterTablesListFormService
    ],
    templateUrl: './users-edit.component.html',
    styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent extends UsersViewComponent {

    isNew: boolean;

    constructor(
        public formService: UserReadFormService,
        protected activatedRoute: ActivatedRoute,
        protected _userPartialUpdateFormService: UserPartialUpdateFormService,
        protected _router: Router,
        protected _snackBar: MatSnackBar,
    ) {
        super(formService, _userPartialUpdateFormService,  null,
            null,activatedRoute, _snackBar, _router);
        this.activatedRoute.queryParams
            .subscribe(params => {
                    this.isNew = params.new;
                }
            );
    }

    public deactivateUser(activate): void {
        super.deactivateUser(activate);
    }

}
