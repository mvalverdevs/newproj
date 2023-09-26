import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {debounceTime, fromEvent, map, merge, Subject, takeUntil, tap} from "rxjs";
import {SipsTable} from "../../../../utils/sipsTable.class";
import {User} from "api/defs/User";
import {UserListFormService} from "api/forms/user/list/list.service";
import {UserList} from "api/defs/UserList";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsSharedModule} from "api/forms/forms-shared.module";
import {UsersModule} from "../users.module";
import {PaginatedTableComponent} from "@bcn/components/paginated-table/paginated-table.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {async} from "@angular/core/testing";
import {distinctUntilChanged} from "rxjs/operators";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {AppUtilsModule} from "../../../../utils/utils.module";
import {UserRoleUserRoleFormService} from "api/forms/user-role/userRole/userRole.service";
import {UserRoleService} from "api/controllers/UserRole";
import {GeneralMasterTablesListFormService} from "../../../../../api/forms/general-master-tables/list/list.service";
import {GeneralMasterTablesService} from "../../../../../api/controllers/GeneralMasterTables";

@Component({
    selector: 'app-users-table',
    standalone: true,
    imports: [
        MatTableModule,
        PaginatedTableComponent,
        FormsSharedModule,
        UsersModule,
        MatFormFieldModule,
        MatInputModule,

        FormsModule,
        AppUtilsModule
    ],
    providers: [
        UserRoleUserRoleFormService,
        UserRoleService,
        GeneralMasterTablesListFormService,
        GeneralMasterTablesService
    ],
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent
    extends SipsTable<User, UserList, UserListFormService> {

    private unsubscribe$: Subject<void> = new Subject();

    params: any;

    displayedColumns = ['name', 'email', 'area', 'department', 'rol', 'actions']; // Columns to show
    displayedColumnsMedium = ['name', 'email', 'area', 'department', 'rol', 'actions'];  // Columns to show
    displayedColumnsSmall = ['name']; // Columns to show

    completeAreaDict: any = {};
    completeRoleDict: any = {};
    @ViewChild('quickSearchInput', {static: false}) quickSearchInput: ElementRef;


    constructor(private _userListFormService: UserListFormService,
                private _router: Router,
                private _masterTablesListFormService: GeneralMasterTablesListFormService,
                private _roleUserRoleFormService: UserRoleUserRoleFormService,
                private _activatedRoute: ActivatedRoute,
                private _changeDetector: ChangeDetectorRef,
    ) {
        super(_userListFormService, _router, _activatedRoute);
    }


    ngOnInit(): void {
        super.ngOnInit();

        this.route.params.subscribe(params => {
            this.params = params;
            this.formService.reset({
                is_active: true,
                limit: 5,
                fields: 'reference_in,email,first_name,id,is_active,last_name,roles,department',
                // expand: '~all'
            });
        });
        setTimeout(() => {
            this.getData();
        }, 500)

    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        if (this.quickSearchInput) {
            merge(fromEvent(this.quickSearchInput.nativeElement, 'keyup'),
                fromEvent(this.quickSearchInput.nativeElement, 'paste'))
                .pipe(
                    takeUntil(this.unsubscribe$),
                    debounceTime(400),
                    distinctUntilChanged(),
                    tap(() => {
                        this.formService.patch({
                            ordering: this.formService.form.get('search').value.length ? 'last_name' : ''
                        })
                        this.reload();
                    })
                )
                .subscribe();
        }

        this._changeDetector.detectChanges();


    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    clearSearch(): void {
        this.formService.form.patchValue({
            search: '',
            ordering: '',
            reference_in: undefined
        });
        this.reload();

    }

    getData(): void {
        this._masterTablesListFormService.submit({type: 'reference_in'}, false)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((areas) => {
                areas.results.forEach(area => {
                    this.completeAreaDict[area.id] = area;
                })
            });

        this._roleUserRoleFormService.submit({}, false)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((roles) => {
                roles['results'].forEach(role => {
                    this.completeRoleDict[role.id] = role;
                });
            })
    }

    changeAutocomplete(): void {
        if (this.formService.form.value.reference_in && !this.formService.form.value.reference_in.length) {
            this.formService.form.get('reference_in').setValue(undefined);
        }
        if (this.formService.form.value.roles && !this.formService.form.value.roles.length) {
            this.formService.form.get('roles').setValue(undefined);
        }
        this.formService.patch({
            ordering: this.formService.form.get('reference_in').value?.length ||
            this.formService.form.get('roles').value?.length ? 'last_name' : ''
        })
        this.reload();
    }

    protected readonly async = async;
}
