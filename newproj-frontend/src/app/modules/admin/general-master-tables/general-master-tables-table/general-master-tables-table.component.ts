import {ChangeDetectorRef, Component, ElementRef, Input, SimpleChanges, ViewChild} from '@angular/core';
import {AppUtilsModule} from "../../../../utils/utils.module";
import {NgIf} from "@angular/common";
import {FlexModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {PaginatedTableComponent} from "../../../../../@bcn/components/paginated-table/paginated-table.component";
import {ReactiveFormsModule} from "@angular/forms";
import {SipsTable} from "../../../../utils/sipsTable.class";
import {GeneralMasterTables} from "../../../../../api/defs/GeneralMasterTables";
import {
    catchError,
    debounceTime,
    fromEvent,
    map,
    merge,
    Observable,
    of,
    Subject,
    Subscription,
    takeUntil,
    tap
} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {distinctUntilChanged} from "rxjs/operators";
import {GeneralMasterTablesTypes} from "../../../../../api/defs/GeneralMasterTablesTypes";
import {GeneralMasterTablesTypesFormService} from "../../../../../api/forms/general-master-tables/types/types.service";
import {GeneralMasterTablesListFormService} from "../../../../../api/forms/general-master-tables/list/list.service";
import {GeneralMasterTablesList} from "../../../../../api/defs/GeneralMasterTablesList";
import {GeneralMasterTablesService} from "../../../../../api/controllers/GeneralMasterTables";
import {UsersModule} from "../../users/users.module";
import {AuthService} from "../../../../utils/auth.service";
import {PermissionsPermissionsFormService} from "../../../../../api/forms/permissions/permissions/permissions.service";
import {PermissionsService} from "../../../../../api/controllers/Permissions";
import {MatDialog} from "@angular/material/dialog";
import {GeneralMasterTablesEditComponent} from "../general-master-tables-edit/general-master-tables-edit.component";
import {GeneralMasterTablesReadFormService} from "../../../../../api/forms/general-master-tables/read/read.service";

@Component({
    selector: 'app-general-master-tables-table',
    templateUrl: './general-master-tables-table.component.html',
    styleUrls: ['./general-master-tables-table.component.scss'],
    standalone: true,
    imports: [
        MatIconModule,
        ReactiveFormsModule,
        NgIf,
        FlexModule,
        AppUtilsModule,
        PaginatedTableComponent,
        MatTableModule,
        UsersModule
    ],
    providers: [
        GeneralMasterTablesListFormService,
        GeneralMasterTablesService,
        GeneralMasterTablesTypesFormService,
        AuthService,
        PermissionsPermissionsFormService,
        PermissionsService,
        GeneralMasterTablesReadFormService
    ]
})


export class GeneralMasterTablesTableComponent
    extends SipsTable<GeneralMasterTables, GeneralMasterTablesList, GeneralMasterTablesListFormService> {


    @Input() reloadTable: boolean;
    @ViewChild('quickSearchInput', {static: false}) quickSearchInput: ElementRef;
    private unsubscribe$: Subject<void> = new Subject();

    params: any;
    generalMasterTables$: Observable<GeneralMasterTables>;

    error: boolean;
    generalMasterTables: any;
    isNew: boolean;
    routeQueryParams$: Subscription;
    displayedColumns = ['name', 'type', 'actions']; // Columns to show
    displayedColumnsMedium = ['name', 'actions'];  // Columns to show
    displayedColumnsSmall = ['name']; // Columns to show

    completeTypeDict: any = {};


    constructor(
        private _tablesListFormService: GeneralMasterTablesListFormService,
        private _router: Router,
        private _dialog: MatDialog,
        private _tablesReadFormService: GeneralMasterTablesReadFormService,
        private _typesFormService: GeneralMasterTablesTypesFormService,
        private _activatedRoute: ActivatedRoute,
        private _changeDetector: ChangeDetectorRef,
    ) {
        super(_tablesListFormService, _router, _activatedRoute);
    }


    ngOnInit(): void {
        super.ngOnInit();

        // this.reloadTable.
        this.route.params.subscribe(params => {
            this.params = params;
            this.formService.reset({
                limit: 1000,
                fields: 'id,name,type,is_visible,is_editable',
            });
        });
        setTimeout(() => {
            this.getData();
        }, 500)

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.reloadTable.currentValue) {
            this.reload();
        }
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
            ordering: ''
        });
        this.reload();
    }

    getData(): void {
        this._typesFormService.submit({}, false)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((types: GeneralMasterTablesTypes) => {
                Object(types).forEach(type => {
                    this.completeTypeDict[type.id] = type;
                })
            });
    }

    changeAutocomplete(): void {
        if (this.formService.form.value.type && !this.formService.form.value.type.length) {
            this.formService.form.get('type').setValue(undefined);
        }
        this.reload();
    }

    updateMasterTable(id): void {
        this._tablesReadFormService
            .submit({id: id}, false)
            .pipe(
                map((generalMasterTables) => {
                    this.generalMasterTables = generalMasterTables;
                    this.openDialog(id);
                }),
                catchError(() => {
                    this.error = true;
                    return of(null);
                })
            ).subscribe();
    }


    openDialog(id): void {
        const dialogRef = this._dialog.open(GeneralMasterTablesEditComponent, {
            width: '600px',
            data: {
                id: id,
                generalMasterTables: this.generalMasterTables
            },
        });
        dialogRef.afterClosed().subscribe(result => {
            this.reload();
        });
    }
}
