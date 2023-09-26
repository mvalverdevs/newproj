import {Component, inject} from '@angular/core';
import {UserReadFormService} from "../../../../../api/forms/user/read/read.service";
import {UserPartialUpdateFormService} from "../../../../../api/forms/user/partialUpdate/partialUpdate.service";
import {UserRoleUserRoleFormService} from "../../../../../api/forms/user-role/userRole/userRole.service";
import {AuthService} from "../../../../utils/auth.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {catchError, map, Observable, of, Subject} from "rxjs";
import {User} from "../../../../../api/defs/User";
import {MatDialog} from "@angular/material/dialog";
import {IndretPartialUpdateFormService} from "../../../../../api/forms/indret/partialUpdate/partialUpdate.service";
import {IndretReadFormService} from "../../../../../api/forms/indret/read/read.service";
import {Indret} from "../../../../../api/defs/Indret";
import { BreadcrumbService } from 'app/utils/breadcrumbs.service';
import { AsyncPipe, NgClass, NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FakeLoadingModule } from '@bcn/components/fake-loading/fake-loading.module';
import { GoBackButtonComponent } from '@bcn/components/go-back-button/go-back-button.component';
import { IndretService } from 'api/controllers/Indret';
import { UsersFormComponent } from '../../users/users-form/users-form.component';
import { IndretsFormComponent } from '../indrets-form/indrets-form.component';
import { AppUtilsModule } from 'app/utils/utils.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { PaginatedTableComponent } from '@bcn/components/paginated-table/paginated-table.component';
import { GeneralMasterTablesService } from 'api/controllers/GeneralMasterTables';
import { IndretTitularService } from 'api/controllers/IndretTitular';
import { IndretListFormService, GeneralMasterTablesListFormService, IndretTitularListFormService, PermissionsPermissionsFormService } from 'api/form-service';
import { GeoBCNModule } from 'app/utils/components/geobcn/geobcn.module';
import { IndretsModule } from '../indrets.module';
import { PermissionsService } from 'api/controllers/Permissions';
import { MatTabsModule } from '@angular/material/tabs';
import { ActionsTableComponent } from '../../actions/actions-table/actions-table.component';
import { ActionsModule } from '../../actions/actions.module';

@Component({
    selector: 'app-indrets-view',
    templateUrl: './indrets-view.component.html',
    styleUrls: ['./indrets-view.component.scss'],
    standalone: true,
    imports: [
        AppUtilsModule,
        AsyncPipe,
        ExtendedModule,
        FlexModule,
        IndretsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatTableModule,
        NgClass,
        NgForOf,
        NgIf,
        PaginatedTableComponent,
        ReactiveFormsModule,
        TitleCasePipe,
        GeoBCNModule,
        MatSortModule,
        MatSnackBarModule,
        MatTabsModule,
        ActionsModule
    ],
    providers: [
        IndretReadFormService,
        IndretPartialUpdateFormService,
        IndretService,
        PermissionsPermissionsFormService,
        AuthService,
        PermissionsService
    ]

})
export class IndretsViewComponent {
    indret$: Observable<Indret>;

    error: boolean;
    indret: any;

    completeAreaDict: any = {};
    completeRoleDict: any = {};

    private unsubscribe$: Subject<void> = new Subject();
    private _matDialog: MatDialog = inject(MatDialog);
    constructor(
        public formService: IndretReadFormService,
        protected _indretPartialUpdateFormService: IndretPartialUpdateFormService,
        private _authService: AuthService,
        protected activatedRoute: ActivatedRoute,
        protected _snackBar: MatSnackBar,
        protected _router: Router,
    ) {
    }

    ngOnInit(): void {
        // Set attribute ID from route params and subscribe
        this.activatedRoute.params.subscribe(params => {
            this.formService.form.patchValue({
                id: params['id']
            });
            this.getIndret();
        });


    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }


    /**
     * Returns an Observable with the users
     */
    public getIndret(): void {
        this.indret$ = this.formService
            .submit(false, false)
            .pipe(
                map((indret) => {
                    this.indret = indret;
                    return indret;
                }),
                catchError(() => {
                    this.error = true;
                    return of(null);
                })
            );

        // this.getData();
    }

    goBack(){
        this._router.navigateByUrl('indrets');
    }
}
