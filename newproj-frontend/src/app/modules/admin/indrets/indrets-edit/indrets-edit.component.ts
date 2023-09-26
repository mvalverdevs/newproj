import { AsyncPipe, NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { FlexModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FakeLoadingModule } from "../../../../../@bcn/components/fake-loading/fake-loading.module";
import { GoBackButtonComponent } from "../../../../../@bcn/components/go-back-button/go-back-button.component";
import { IndretService } from "../../../../../api/controllers/Indret";
import { IndretPartialUpdateFormService } from "../../../../../api/forms/indret/partialUpdate/partialUpdate.service";
import { IndretReadFormService } from "../../../../../api/forms/indret/read/read.service";
import { UsersFormComponent } from "../../users/users-form/users-form.component";
import { IndretsFormComponent } from "../indrets-form/indrets-form.component";
import { IndretsViewComponent } from "../indrets-view/indrets-view.component";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-indrets-edit',
    templateUrl: './indrets-edit.component.html',
    styleUrls: ['./indrets-edit.component.scss'],
    standalone: true,
    imports: [
        AsyncPipe,
        FakeLoadingModule,
        FlexModule,
        GoBackButtonComponent,
        MatButtonModule,
        NgIf,
        RouterLink,
        UsersFormComponent,
        IndretsFormComponent,
        MatIconModule
    ],
    providers: [
        IndretReadFormService,
        IndretService,
        IndretPartialUpdateFormService,
        MatSnackBar
    ]
})
export class IndretsEditComponent extends IndretsViewComponent {

    isNew: boolean;

    constructor(
        public formService: IndretReadFormService,
        protected activatedRoute: ActivatedRoute,
        protected _indretPartialUpdateFormService: IndretPartialUpdateFormService,
        protected _router: Router,
        protected _snackBar: MatSnackBar,
    ) {
        formService.form.patchValue({
            "expand":"~all,titularity.~all,circuits.~all,circuits.canteen.~all"
        })
        super(formService, _indretPartialUpdateFormService, null,
            null, _snackBar, _router);
        this.activatedRoute.queryParams
            .subscribe(params => {
                    this.isNew = params.new;
                }
            );
    }

}
