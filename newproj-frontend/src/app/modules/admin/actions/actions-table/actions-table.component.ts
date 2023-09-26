import { Component, ViewChild, ElementRef, ChangeDetectorRef, Input } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { Router, ActivatedRoute } from "@angular/router";
import { IndretActionListFormService, GeneralMasterTablesListFormService, IndretListFormService, IndretCircuitListFormService } from "api/form-service";
import { IndretAction, IndretActionList, GeneralMasterTables, Indret, IndretCircuit } from "api/model";
import { SipsTable } from "app/utils/sipsTable.class";
import { Subject, map, tap, merge, fromEvent, takeUntil, debounceTime, distinctUntilChanged, Observable } from "rxjs";

@Component({
    selector: 'app-actions-table',
    templateUrl: './actions-table.component.html',
    styleUrls: ['./actions-table.component.scss'],
})
export class ActionsTableComponent
    extends SipsTable<IndretAction, IndretActionList, IndretActionListFormService> {

    @Input() indret: string;

    private unsubscribe$: Subject<void> = new Subject();

    params: any;
    completeTypeDict: { number?: GeneralMasterTables } = {};
    completeTypeCircuitsDict: { number?: GeneralMasterTables } = {};
    completeInspectionDict: { number?: GeneralMasterTables } = {};

    completeIndretDict: { number?: Indret } = {}; 
    completeCircuitDict: { number?: IndretCircuit } = {};

    dataStatusList = [{ id: "planned", name: "Planificada" },{ id: "cancelled", name: "Anul·lada" },{ id: "done", name: "Realitzada" },{id: "pending_planning", name: "Pendent planificació" },{ id: "penging_assingnment", name: "Pendient d'asignació" }]
    indretList = []

    displayedColumns = ['date_scheduled','action_date','name_indrets','type_indrets','type_circuit','inspection_reason','status','samples_num','id','neighborhood_name','actions']; // Columns to show
    // displayedColumnsMedium = ['id', 'name', 'actions'];  // Columns to show
    // displayedColumnsSmall = ['name','actions']; // Columns to show
    dataStatus = {};
    checkIndret = false;
    checkIndretCircuit = false;
    indrets$:Observable<Indret[]>;
    circuits$:Observable<IndretCircuit[]>;
    
    
    @ViewChild('quickSearchInput', {static: false}) quickSearchInput: ElementRef;
    @ViewChild(MatSort) sort: MatSort;


    constructor(private _indretListFS: IndretActionListFormService,
                private _indretListFormService: IndretListFormService,
                private _indretCircuitListFormService: IndretCircuitListFormService,
                private _router: Router,
                private _activatedRoute: ActivatedRoute,
                private _changeDetector: ChangeDetectorRef,
                private _generalMasterTablesListFormService: GeneralMasterTablesListFormService,
    ) {
        super(_indretListFS, _router, _activatedRoute);
        this.dataStatus['planned']="Planificada"
        this.dataStatus['done']="Realitzada"
        this.dataStatus['cancelled']="Anul·lada"
        this.dataStatus['pending_planning']="Pendent planificació"
        this.dataStatus['penging_assingnment']="Pendient d'asignació"
    }


    ngOnInit(): void {
        this.getData();
        super.ngOnInit();
        this.route.params.subscribe(params => {
            this.params = params;
            this.formService.reset({
                is_active: true,
                limit: 5,
                indrets: this.indret,
                fields: 'id,action_date,date_scheduled,indret_circuits,inspection_reason,samples_number,status,indret',
                // expand: '~all'
            });
        })

    }
    
    changesFilters(event){
        this.reload();
    }

    getData() {
        this._generalMasterTablesListFormService.submit(
            {type: 'indret_type',is_visible:true, limit: 1000})
            .pipe(
                map(areas => {
                    return areas.results
                }),
                tap((areas:GeneralMasterTables[]) => {
                    areas.forEach(area => {
                        this.completeTypeDict[area.id] = area;
                    })

                })            
            ).subscribe();
        this._generalMasterTablesListFormService.submit(
            {type: 'indret_circuit_type',is_visible:true, limit: 1000})
            .pipe(
                map(areas => {
                    return areas.results
                }),
                tap((areas:GeneralMasterTables[]) => {
                    areas.forEach(area => {
                        this.completeTypeCircuitsDict[area.id] = area;
                    })

                })            
            ).subscribe();
        this._generalMasterTablesListFormService.submit(
            {type: 'action_inspection_reason',is_visible:true, limit: 1000})
            .pipe(
                map(areas => {
                    return areas.results
                }),
                tap((areas:GeneralMasterTables[]) => {
                    areas.forEach(area => {
                        this.completeInspectionDict[area.id] = area;
                    })
                })            
            ).subscribe();
            
        this.indrets$=this._indretListFormService.submit(
            {   limit: 1000,
                fields:'id,name,types,neighborhood_name,titularity.first_name,titularity.last_name,titularity.second_last_name,titularity.identification,titularity.social_reason,titularity.CIF,'})
            .pipe(
                map(areas => {
                    return areas.results
                }),
                map((areas:Indret[]) => {
                    areas.forEach(area => {
                        this.completeIndretDict[area.id] = area;
                    })
                    this.indretList=areas.map(value=>{return {id:value.id,name:this.getName(value)}});
                    return areas
                })            
            )

        this.circuits$=this._indretCircuitListFormService.submit(
            {limit: 1000,fields:'id,name,type'})
            .pipe(
                map(areas => {
                    return areas.results
                }),
                map((areas:IndretCircuit[]) => {
                    areas.forEach(area => {
                        this.completeCircuitDict[area.id] = area;
                    })
                    return areas;    
                })        
            )
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

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
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
            }else {
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
