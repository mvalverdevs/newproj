import { Component } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { IndretActionPartialUpdateFormService, IndretActionReadFormService } from 'api/form-service';
import { ActionsViewComponent } from '../actions-view/actions-view.component';

@Component({
    selector: 'app-actions-edit',
    templateUrl: './actions-edit.component.html',
    styleUrls: ['./actions-edit.component.scss'],
})
export class ActionsEditComponent extends ActionsViewComponent {

    isNew: boolean;

    constructor(
        public formService: IndretActionReadFormService,
        protected activatedRoute: ActivatedRoute,
        protected _actionPartialUpdateFormService: IndretActionPartialUpdateFormService,
        protected _router: Router,
        protected _snackBar: MatSnackBar,
    ) {
        formService.form.patchValue({
            "expand":"~all"
        })
        super(formService, _actionPartialUpdateFormService, null,
            null, _snackBar, _router);
        this.activatedRoute.queryParams
            .subscribe(params => {
                    this.isNew = params.new;
                }
            );
    }
}
