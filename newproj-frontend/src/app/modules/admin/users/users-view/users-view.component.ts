import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, map, Observable, of, Subject} from "rxjs";
import {User} from "api/defs/User";
import {AppUtilsModule} from "../../../../utils/utils.module";
import {BCNErrorComponent} from "@bcn/components/bcn-error/bcn-error.component";
import {FakeLoadingModule} from "@bcn/components/fake-loading/fake-loading.module";
import {FlexModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {UserReadFormService} from "api/forms/user/read/read.service";
import {UserService} from "api/controllers/User";
import {UserRoleUserRoleFormService} from "api/forms/user-role/userRole/userRole.service";
import {UserRoleService} from "api/controllers/UserRole";
import {GoBackButtonComponent} from "@bcn/components/go-back-button/go-back-button.component";
import {UserPartialUpdateFormService} from "api/forms/user/partialUpdate/partialUpdate.service";
import {FuseConfirmationDialogComponent} from "../../../../../@fuse/services/confirmation/dialog/dialog.component";
import {PermissionsPermissionsFormService} from "../../../../../api/forms/permissions/permissions/permissions.service";
import {AuthService} from "../../../../utils/auth.service";
import {PermissionsService} from "../../../../../api/controllers/Permissions";
import {GeneralMasterTablesListFormService} from "../../../../../api/forms/general-master-tables/list/list.service";
import {GeneralMasterTablesService} from "../../../../../api/controllers/GeneralMasterTables";

@Component({
    selector: 'app-users-view',
    templateUrl: './users-view.component.html',
    standalone: true,
    providers: [
        MatSnackBar,
        UserReadFormService,
        UserService,
        UserRoleUserRoleFormService,
        UserRoleService,
        UserPartialUpdateFormService,
        AuthService,
        PermissionsService,
        PermissionsPermissionsFormService,
        GeneralMasterTablesListFormService,
        GeneralMasterTablesService
    ],
    imports: [
        AppUtilsModule,
        BCNErrorComponent,
        FakeLoadingModule,
        FlexModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NgIf,
        ReactiveFormsModule,
        GoBackButtonComponent,
        RouterLink
    ],
    styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent {
    user$: Observable<User>;

    error: boolean;
    user: any;

    completeAreaDict: any = {};
    completeRoleDict: any = {};

    private unsubscribe$: Subject<void> = new Subject();
    private _matDialog: MatDialog = inject(MatDialog);

    constructor(
        public formService: UserReadFormService,
        protected _userPartialUpdateFormService: UserPartialUpdateFormService,
        private _roleUserRoleFormService: UserRoleUserRoleFormService,
        private _authService: AuthService,
        protected activatedRoute: ActivatedRoute,
        protected _snackBar: MatSnackBar,
        protected _router: Router
    ) {
    }


    ngOnInit(): void {
        // Set attribute ID from route params and subscribe
        this.activatedRoute.params.subscribe(params => {
            this.formService.form.patchValue({
                id: params['id']
            });
            this.getUser();
        });


    }
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /**
     * Returns an Observable with the users
     */
    public getUser(): void {
        this.user$ = this.formService
            .submit(false, false)
            .pipe(
                map((user) => {
                    this.user = user;
                    return user;
                }),
                catchError(() => {
                    this.error = true;
                    return of(null);
                })
            );

        // this.getData();
    }

    getData(): void {
        // this._userAreaListFormService?.submit()
        //     .pipe(
        //         map((areas) => {
        //             areas['results'].forEach(area => {
        //                 this.completeAreaDict[area.id] = area;
        //             })
        //         })
        //     ).subscribe();

        this._roleUserRoleFormService?.submit()
            .pipe(
                map((roles) => {
                    roles['results'].forEach(role => {
                        this.completeRoleDict[role.id] = role;
                    })
                })
            ).subscribe();
    }

    public deactivateUser(activate): void {
        const userConfig = {
            title: activate ? "Desactivació d'usuari" : "Activació d'usuari",
            message: activate ? "Esteu segur que voleu desactivar aquest usuari" : "Esteu segur que voleu activar aquest usuari",
            icon: {
                show: false
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'Si',
                    color: 'primary'
                },
                cancel: {
                    show: true,
                    label: 'No'
                }
            },
            dismissible: true
        }

        const dialogRef = this._matDialog.open(FuseConfirmationDialogComponent, {
            autoFocus: false,
            data: userConfig,
            panelClass: 'fuse-confirmation-dialog-panel',
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                this._userPartialUpdateFormService.submit({data: {is_active: !activate}, id: this.user.id})
                    .subscribe(() => {
                        this._router.navigateByUrl(`/users`).then(() => {
                            this._snackBar.open(`El usuari s'ha desat correctament.`, 'Tancar', {duration: 6000});
                        });
                    });
            }
        });


    }


}
