import {Component, Input, ViewChild} from '@angular/core';
import {catchError, map, of, takeUntil} from "rxjs";
import {User} from "api/defs/User";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {SipsForm} from "../../../../utils/sipsForm.class";
import {UserPartialUpdateFormService} from "api/forms/user/partialUpdate/partialUpdate.service";
import {UserListFormService} from "api/forms/user/list/list.service";
import {UsersModule} from "../users.module";
import {BCNDirectivesModule} from "@bcn/directives/directives";
import {UserCreateFormService} from "api/forms/user/create/create.service";
import {AppUtilsModule} from "../../../../utils/utils.module";
import {UserRoleUserRoleFormService} from "api/forms/user-role/userRole/userRole.service";
import {UserRoleService} from "api/controllers/UserRole";
import {Utils} from "../../../../utils/utils";
import {
    AreaAutocompleteComponent
} from "../../../../utils/components/autocompletes/area-autocomplete/area-autocomplete.component";
import {GeneralMasterTables} from "../../../../../api/defs/GeneralMasterTables";

@Component({
    selector: 'app-users-form',
    standalone: true,
    providers: [
        MatSnackBar,
        UserPartialUpdateFormService,
        UserListFormService,
        UserCreateFormService,
        UserRoleUserRoleFormService,
        UserRoleService
    ],
    templateUrl: './users-form.component.html',
    imports: [
        UsersModule,
        BCNDirectivesModule,
        AppUtilsModule
    ],
    styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent
    extends SipsForm<UserPartialUpdateFormService | UserCreateFormService, User> {

    submitBtnText: string;
    isEdit: boolean;
    errors = [];
    areasDict: { number?: GeneralMasterTables } = {};

    @ViewChild(AreaAutocompleteComponent) areaAutocompleteComponent: AreaAutocompleteComponent;


    @Input()
    user: User;

    @Input()
    isNew: boolean;

    constructor(
        private _partialUpdateService: UserPartialUpdateFormService,
        private _userListFS: UserListFormService,
        private _createService: UserCreateFormService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _matDialog: MatDialog,
        private _matSnackBar: MatSnackBar
    ) {
        super(_matSnackBar);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        // /** Determines if we are adding a new user or editing a current one */
        this.isEdit = !!this.user;
        if (!this.isEdit) {
            this.submitBtnText = 'Crear';
            this.formService = this._createService;
            super.ngOnInit();
        } else {
            this.submitBtnText = 'Guardar';
            this.formService = this.isNew ? this._createService : this._partialUpdateService;
            this.formService.reset({id: this.isNew ? null : this.user.id, data: this.user});
            this.formService.form.get('data.registration_number').disable({onlySelf: true});
            this.formService.form.get('data.charge').disable({onlySelf: true});
            this.formService.form.get('data.department').disable({onlySelf: true});
            super.ngOnInit();
        }
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    cancelEdit($event: MouseEvent): void {
        this._router.navigate(['..'], {relativeTo: this._activatedRoute});
    }

    /** Send the form to the server */
    submit(): void {
        if (!this.isEdit) {
            this.formService.form.patchValue({data: {is_active: true}});
        }
        if ((this.formService.form.get('data.email').value)?.includes('@aspb.cat')) {
            this.formService.form.get('data.company_name').setValue(undefined);
        }
        this.formService
            .submit()
            .pipe(
                takeUntil(this.unsubscribe$),
                map(user => {
                    if (this.isEdit) {
                        if (this.isNew) {
                            this._router.navigateByUrl(`/users`);
                        } else {
                            this._router.navigateByUrl(`/users`);
                        }
                    } else {
                        this._router.navigateByUrl(`/users`);
                    }

                    this.snackBar.open(`El usuari s'ha desat correctament.`, 'Tancar', {duration: 6000});
                }),
                catchError(errors => {
                        this.snackBar.open(
                            `S'ha produït un error en guardar el usuari. Revisi els camps marcats en vermell.`,
                            'Tancar',
                            {panelClass: 'error', duration: 6000}
                        );

                        this.errors = [];
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


    createNewArea(area): void {
        // this._userAreaCreateFormService.submit({data: {name: area}}).pipe(
        //     takeUntil(this.unsubscribe$),
        //     map((result) => {
        //         const val = this.formService.form.get('data.areas').value;
        //         val.push(result.id);
        //         this._userAreaListFormService
        //             .submit({limit: 1000, expand: '~all'})
        //             .pipe(map(data => {
        //                 data.results.forEach(t => this.areasDict[t.id] = t);
        //                 const newArea = [];
        //                 val.forEach(v => {
        //                     if (this.areasDict[v]) {
        //                         newArea.push(this.areasDict[v]);
        //                     }
        //                 });
        //                 if (newArea.length) {
        //                     this.areaAutocompleteComponent.writeValue(val);
        //                     this.areaAutocompleteComponent.setArea(newArea);
        //                 }
        //             })).subscribe();
        //     }),
        //     catchError(() => {
        //         return of([]);
        //     }),
        // ).subscribe();
    }

    getTags(): void {
        // this._userAreaListFormService
        //     .submit({limit: 1000, expand: '~all'})
        //     .pipe(map(data => {
        //         data.results.forEach(t => this.areasDict[t.id] = t);
        //         return data.results;
        //     })).subscribe();
    }


}
