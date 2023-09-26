import {Component, Input} from '@angular/core';
import {SipsForm} from "../../../../utils/sipsForm.class";
import {
    GeneralMasterTablesPartialUpdateFormService
} from "../../../../../api/forms/general-master-tables/partialUpdate/partialUpdate.service";
import {
    GeneralMasterTablesCreateFormService
} from "../../../../../api/forms/general-master-tables/create/create.service";
import {GeneralMasterTables} from "../../../../../api/defs/GeneralMasterTables";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppUtilsModule} from "../../../../utils/utils.module";
import {UsersModule} from "../../users/users.module";
import {AuthService} from "../../../../utils/auth.service";
import {PermissionsPermissionsFormService} from "../../../../../api/forms/permissions/permissions/permissions.service";
import {PermissionsService} from "../../../../../api/controllers/Permissions";
import {catchError, map, of, takeUntil} from "rxjs";
import {Utils} from "../../../../utils/utils";
import {ActivatedRoute, Router} from "@angular/router";
import {GeneralMasterTablesService} from "../../../../../api/controllers/GeneralMasterTables";
import {GeneralMasterTablesTypesFormService} from "../../../../../api/forms/general-master-tables/types/types.service";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-general-master-tables-form',
    templateUrl: './general-master-tables-form.component.html',
    styleUrls: ['./general-master-tables-form.component.scss'],
    standalone: true,
    imports: [
        AppUtilsModule,
        UsersModule,
        MatDialogModule
    ],
    providers: [
        MatSnackBar,
        AuthService,
        PermissionsPermissionsFormService,
        PermissionsService,
        GeneralMasterTablesCreateFormService,
        GeneralMasterTablesService,
        GeneralMasterTablesPartialUpdateFormService,
        GeneralMasterTablesTypesFormService
    ]
})
export class GeneralMasterTablesFormComponent
    extends SipsForm<GeneralMasterTablesPartialUpdateFormService | GeneralMasterTablesCreateFormService, GeneralMasterTables> {


    @Input()
    generalMasterTables: GeneralMasterTables;

    @Input()
    isNew: boolean;

    isEdit: boolean;
    submitBtnText: string;

    constructor(private _matSnackBar: MatSnackBar,
                private _createService: GeneralMasterTablesCreateFormService,
                private _partialUpdateService: GeneralMasterTablesPartialUpdateFormService,
                private _activatedRoute: ActivatedRoute,
                private _router: Router,
                public dialogRef: MatDialogRef<GeneralMasterTablesFormComponent>
                ) {
        super(_matSnackBar);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        // /** Determines if we are adding a new user or editing a current one */
        this.isEdit = !!this.generalMasterTables;
        if (!this.isEdit) {
            this.submitBtnText = 'Crear';
            this.formService = this._createService;
            this.formService.form.get('data.is_visible').setValue(true)
            super.ngOnInit();
        } else {
            this.submitBtnText = 'Guardar';
            this.formService = this.isNew ? this._createService : this._partialUpdateService;
            this.formService.reset({id: this.isNew ? null : this.generalMasterTables.id, data: this.generalMasterTables});
            super.ngOnInit();
        }
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    cancelEdit($event: MouseEvent): void {
        // this._router.navigate(['..'], {relativeTo: this._activatedRoute});
        this.dialogRef.close()
    }

    /** Send the form to the server */
    submit(): void {
        this.formService
            .submit()
            .pipe(
                takeUntil(this.unsubscribe$),
                map(user => {
                    this.snackBar.open(`La taula mestra s'ha creat correctament.`,
                        'Tancar', {duration: 6000});
                    this.dialogRef.close(true);
                }),
                catchError(errors => {
                        this.snackBar.open(
                            `S'ha produït un error en guardar la taula mestra.
                            ${errors?.error?.non_field_errors ? errors?.error?.non_field_errors[0] : ''}`,
                            'Tancar',
                            {panelClass: 'error', duration: 6000}
                        );

                        // this.errors = [];
                        Utils.processServerErrors(
                            this.formService.form.controls.data['controls'],
                            errors.error
                        );
                        return of({});
                    }
                )
            )
            .subscribe();
    }

}
