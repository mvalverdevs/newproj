import { AsyncPipe, NgClass, NgForOf, NgIf, TitleCasePipe } from "@angular/common";
import { ChangeDetectorRef, Component, ElementRef, SimpleChanges, ViewChild } from '@angular/core';
import { ExtendedModule, FlexModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { GeneralMasterTables } from 'api/model';
import { GeoBCNModule } from 'app/utils/components/geobcn/geobcn.module';
import { Subject, debounceTime, fromEvent, map, merge, takeUntil, tap } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { PaginatedTableComponent } from "../../../../../@bcn/components/paginated-table/paginated-table.component";
import { GeneralMasterTablesService } from "../../../../../api/controllers/GeneralMasterTables";
import { IndretService } from "../../../../../api/controllers/Indret";
import { IndretTitularService } from "../../../../../api/controllers/IndretTitular";
import { Indret } from "../../../../../api/defs/Indret";
import { IndretList } from "../../../../../api/defs/IndretList";
import { GeneralMasterTablesListFormService } from "../../../../../api/forms/general-master-tables/list/list.service";
import { IndretTitularListFormService } from "../../../../../api/forms/indret-titular/list/list.service";
import { IndretListFormService } from "../../../../../api/forms/indret/list/list.service";
import { SipsTable } from "../../../../utils/sipsTable.class";
import { AppUtilsModule } from "../../../../utils/utils.module";
import { IndretsModule } from "../indrets.module";

@Component({
    selector: 'app-indrets-table',
    templateUrl: './indrets-table.component.html',
    styleUrls: ['./indrets-table.component.scss'],
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
    ],
    providers: [
        IndretListFormService,
        IndretService,
        GeneralMasterTablesListFormService,
        GeneralMasterTablesService,
        IndretTitularListFormService,
        IndretTitularService
    ]
})
export class IndretsTableComponent
    extends SipsTable<Indret, IndretList, IndretListFormService> {

    private unsubscribe$: Subject<void> = new Subject();

    params: any;
    completeTypeDict: { number?: GeneralMasterTables } = {};
    completeCategoryDict: { number?: GeneralMasterTables } = {};

    displayedColumns = ['id', 'name', 'titularity', 'address', 'type', 'category',  'actions']; // Columns to show
    displayedColumnsMedium = ['id', 'name', 'address', 'type', 'actions'];  // Columns to show
    displayedColumnsSmall = ['name','actions']; // Columns to show

    types=[];
    categories=[];

    @ViewChild('quickSearchInput', {static: false}) quickSearchInput: ElementRef;


    constructor(private _indretListFormService: IndretListFormService,
                private _router: Router,
                private _titularListFormService: IndretTitularListFormService,
                private _activatedRoute: ActivatedRoute,
                private _changeDetector: ChangeDetectorRef,
                private _generalMasterTablesListFormService: GeneralMasterTablesListFormService,
    ) {
        super(_indretListFormService, _router, _activatedRoute);
    }


    ngOnInit(): void {
        super.ngOnInit();
        this.getData();
        this.route.params.subscribe(params => {
            this.params = params;
            this.formService.reset({
                is_active: true,
                limit: 5,
                fields: 'id,id_intern,is_active,identification,name,address,types,sector,titularity,related_indrets,categories',
                // expand: '~all'
            });
        })

    }

    getData() {
        this._generalMasterTablesListFormService.submit(
            {type: 'indret_type', limit: 1000})
            .pipe(
                map(areas => {
                    return areas.results
                }),
                tap((areas:GeneralMasterTables[]) => {
                    areas.forEach(area => {
                        this.completeTypeDict[area.id] = area;
                    })
                    this.types=areas;
                })            
            ).subscribe();

        this._generalMasterTablesListFormService.submit(
            {type: 'indret_category', limit: 1000})
            .pipe(
                map(areas => {
                    return areas.results
                }),
                tap((areas:GeneralMasterTables[]) => {
                    areas.forEach(area => {
                        this.completeCategoryDict[area.id] = area;
                    });
                    this.categories=areas
                })            
            ).subscribe();
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
                        this.reload();
                    })
                )
                .subscribe();
        }

        this._changeDetector.detectChanges();
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
        this.reload();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    changesFilters(event){
        this.reload();
    }

    getName(indret){ 
        let result = "";
        if(indret.name || indret.name != ""){
            result = indret.name;
        } else if(indret.titularity) {
            if(indret.titularity.is_legal_entity){
                if(indret.titularity.social_reason){
                    result = indret.titularity.social_reason;
                    result += ' (';
                    result += indret.titularity.CIF;
                    result += ')';
                }
            } else {
                result += indret.titularity.first_name? indret.titularity.first_name : '';
                result += ' ';
                result += indret.titularity.last_name? indret.titularity.last_name : '';
                result += ' ';
                result += indret.titularity.second_last_name ? indret.titularity.second_last_name : '';
                result += ' (';
                result += indret.titularity.identification ? indret.titularity.identification : '';
                result += ')';
            }
            }
        return result;
    }
    
    getTitular(titularity){ 
        let result = "";
        if(titularity) {
            if(titularity.is_legal_entity){
                if(titularity.social_reason){
                    result += titularity.social_reason;
                    result += ' (';
                    result += titularity.CIF ;
                    result += ')';
                }
            }else {
                result += titularity.first_name? titularity.first_name : '';
                result += ' ';
                result += titularity.last_name? titularity.last_name : '';
                result += ' ';
                result += titularity.second_last_name ? titularity.second_last_name : '';
                result += ' (';
                result += titularity.identification ? titularity.identification : '';
                result += ')';
            }
            }
        return result;
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    clearSearch(): void {
        this.formService.form.patchValue({
            search: ''
        });
        this.reload();

    }
}
