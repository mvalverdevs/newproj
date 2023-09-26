import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentLibraryService } from 'api/controllers/DocumentLibrary';
import { IndretContactService } from 'api/controllers/IndretContact';
import { IndretTitularService } from 'api/controllers/IndretTitular';
import {
    DocumentLibraryCreateFormService,
    DocumentLibraryDeleteFormService,
    DocumentLibraryPartialUpdateFormService,
    IndretContactCreateFormService,
    IndretContactPartialUpdateFormService,
    IndretTitularCreateFormService,
    IndretTitularListFormService,
    IndretTitularPartialUpdateFormService,
} from 'api/form-service';
import _, { keys, result } from 'lodash';
import {
    Observable,
    catchError,
    forkJoin,
    of,
    switchMap,
    takeUntil,
    zip,
} from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { APIConfigService } from '../../../../../api/apiconfig.service';
import { GeneralMasterTablesService } from '../../../../../api/controllers/GeneralMasterTables';
import { DocumentLibrary } from '../../../../../api/defs/DocumentLibrary';
import { DocumentLibraryFileUpload } from '../../../../../api/defs/DocumentLibraryFileUpload';
import { GeneralMasterTablesListFormService } from '../../../../../api/forms/general-master-tables/list/list.service';
import { IndretCreateFormService } from '../../../../../api/forms/indret/create/create.service';
import { IndretListFormService } from '../../../../../api/forms/indret/list/list.service';
import { IndretPartialUpdateFormService } from '../../../../../api/forms/indret/partialUpdate/partialUpdate.service';
import {
    GeneralMasterTables,
    Indret,
    IndretCircuit,
    IndretCircuitCanteen,
    IndretCompany,
    SamplePoint,
} from '../../../../../api/model';
import { FormService, SipsForm } from '../../../../utils/sipsForm.class';
import { Utils } from '../../../../utils/utils';
import { IndretsModule } from '../indrets.module';
import { IndretFormService } from './indretFormService.type';
import { IndretControlsService } from './indrets.service';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { L } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionDialogComponent } from '@bcn/components/dialogs/description/description.component';
import { Emitter } from 'highlight.js';
import { IsShownDirective } from 'app/utils/directives/is-shown.directive';
import { AppUtilsModule } from 'app/utils/utils.module';

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'dd/MM/yyyy',
    },
    display: {
        dateInput: 'dd/MM/yyyy',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM yyyy',
    },
};

@Component({
    selector: 'app-indrets-form',
    templateUrl: './indrets-form.component.html',
    styleUrls: ['./indrets-form.component.scss'],
    standalone: true,
    providers: [
        IndretControlsService,
        MatSnackBar,
        IndretPartialUpdateFormService,
        IndretCreateFormService,
        GeneralMasterTablesListFormService,
        GeneralMasterTablesService,
        IndretContactService,
        IndretContactCreateFormService,
        IndretContactPartialUpdateFormService,
        DocumentLibraryService,
        DocumentLibraryCreateFormService,
        DocumentLibraryPartialUpdateFormService,
        DocumentLibraryDeleteFormService,
        IndretTitularListFormService,
        IndretTitularService,
        IndretTitularCreateFormService,
        IndretTitularPartialUpdateFormService,
        { provide: DateAdapter, useValue: new LuxonDateAdapter('ca', {
            firstDayOfWeek: 1, 
            useUtc: true 
        }) },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },

    ],
    imports: [
        MatDatepickerModule,
        MomentDateModule,
        IndretsModule,
        MatTabsModule,
        CommonModule,
        AppUtilsModule,
    ],
})
export class IndretsFormComponent extends SipsForm<IndretFormService, any> {
    submitBtnText: string;
    isEdit: boolean;

    general = {};
    titular = {};
    contacte = {};
    circuits: IndretCircuit[] = [];
    canteen: { number?: IndretCircuitCanteen } = {};

    completeTypeDict: { number?: GeneralMasterTables } = {};
    completeCategoryDict: { number?: GeneralMasterTables } = {};
    completeCircuitTypeDict: any = {};
    completeContactTypeDict: any = {};

    canteenCompanyGestor: { number?: IndretCompany } = {};
    canteenCompanySuministrador: { number?: IndretCompany } = {};
    samplePoint: { number?: SamplePoint } = {};
    document = {};

    SCHOOL = 619;

    errorGeneral = false;
    errorTitular = false;
    errorContacte = false;
    errorDocument = false;
    errorCircuits = false;

    formServiceDocument: FormService<any>;
    formServiceTitularPUpdate:
        | IndretTitularPartialUpdateFormService
        | IndretTitularCreateFormService;

    contactList: FormGroup;
    currentFiles: DocumentLibrary[] = [];
    files: DocumentLibrary[] = [];
    filesForm: FormGroup;
    errors = {};
    @Input()
    indret: Indret;

    @Input()
    isNew: boolean;

    constructor(
        private _partialUpdateService: IndretPartialUpdateFormService,
        private _createService: IndretCreateFormService,
        private _documentCreateService: DocumentLibraryCreateFormService,
        private _documentPartialUpdateService: DocumentLibraryPartialUpdateFormService,
        private _indretTitularPUFormService: IndretTitularPartialUpdateFormService,
        private _indretTitularCreateFS: IndretTitularCreateFormService,
        private _indretListFS: IndretListFormService,
        private _router: Router,
        private http: HttpClient,
        private _activatedRoute: ActivatedRoute,
        private apiConfigService: APIConfigService,
        private _matSnackBar: MatSnackBar,
        private changeDetectorRef: ChangeDetectorRef,
        private showService: IndretControlsService,
        private _generalMasterTablesListFormService: GeneralMasterTablesListFormService,
        private cdRef: ChangeDetectorRef,
        private _matDialog: MatDialog
    ) {
        super(_matSnackBar);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        // /** Determines if we are adding a new user or editing a current one */
        this.isEdit = !!this.indret;
        this.getData();
        if (!this.isEdit) {
            this.submitBtnText = 'Crear';
            this.formService = this._createService;
            this._createService.reset({data:{is_active:true}});
            this.formServiceDocument = this._documentCreateService;
        } else {
            this.formService = this._partialUpdateService;
            this.formServiceDocument = this._documentPartialUpdateService;
            this.formServiceTitularPUpdate = this._indretTitularPUFormService;
            this.formServiceTitularPUpdate.reset({
                id: this.indret.titularity.id,
                data: this.indret.titularity,
            });
            this.submitBtnText = 'Guardar';
        }

        super.ngOnInit();
    }

    ngAfterViewInit() {
        if (this.isEdit) {
            this._documentPartialUpdateService.form.reset();
            this.formServiceTitularPUpdate.reset({
                id: this.indret.titularity.id,
                data: this.indret.titularity,
            });
            this.indret.titularity = null;
            this.formService.reset({
                id: this.isNew ? null : this.indret?.id,
                data: this.indret,
            });
            this.files = this.indret.documents_data;
        } else {
            if (localStorage.getItem('form')) {
                this.formService.reset({
                    data: JSON.parse(localStorage.getItem('form')),
                });
                this.files = JSON.parse(localStorage.getItem('form'))['documents_data'];
                localStorage.removeItem('form');
            }
            this.formService.form.markAsDirty();
        }
        if(this.indret){
            this.indret?.is_active? this.formService.form.enable() : this.formService.form.disable();
            this.indret?.is_active? this.formServiceDocument.form.enable() : this.formServiceDocument.form.disable();
            this.indret?.is_active? this._indretTitularPUFormService.form.enable() : this._indretTitularPUFormService.form.disable();
        } else {
            this.formService.form.enable();
            this.formServiceDocument.form.enable();
        }
    }

    getData() {
        this._generalMasterTablesListFormService
            .submit({ type: 'indret_type', limit: 1000 })
            .pipe(
                map((areas) => {
                    return areas.results;
                }),
                tap((areas: GeneralMasterTables[]) => {
                    areas.forEach((area) => {
                        this.completeTypeDict[area.id] = area;
                    });
                    let list_healh_register = _.map(
                        areas.filter((value) =>
                            [
                                'ROESP - Comercialitzador biocides',
                                'ROESP - Magatzem biocides',
                                'Indústria alimentària amb instal·lacions',
                                'Indústria alimentària sense instal·lacions (domicili social)',
                            ].includes(value.name)
                        ),
                        (area) => area.id
                    );
                    
                    this.showService.setBehaviour(
                        'healh_register_type',
                        list_healh_register
                    );
                    
                })
            )
            .subscribe();
        this._generalMasterTablesListFormService
            .submit({ type: 'indret_category', limit: 1000 })
            .pipe(
                map((areas) => {
                    return areas.results;
                }),
                tap((areas: GeneralMasterTables[]) => {
                    areas.forEach((area) => {
                        this.completeCategoryDict[area.id] = area;
                    });
                    let list_school = _.map(
                        areas.filter((value) =>
                            ['Centre educatiu'].includes(value.name)
                        ),
                        (area) => area.id
                    );
                    let list_school_category_canteen = _.map(
                        areas.filter((value) =>
                            [
                                'Centre educatiu',
                                'Centro assistencial o social residencial',
                                'Centre sanitari i sociosanitari',
                            ].includes(value.name)
                        ),
                        (area) => area.id
                    );
                    let list_healh_register = _.map(
                        areas.filter((value) =>
                            [
                                'Centre educatiu',
                                'Centro assistencial o social residencial',
                                'Centre sanitari i sociosanitari',
                            ].includes(value.name)
                        ),
                        (area) => area.id
                    );
                    this.showService.setBehaviour(
                        'school_category_canteen',
                        list_school_category_canteen
                    );
                    this.showService.setBehaviour(
                        'healh_register_category',
                        list_healh_register
                    );
                    this.showService.setBehaviour('school', list_school);

                })
            )
            .subscribe();

        this._generalMasterTablesListFormService
            .submit({ type: 'indret_circuit_type', limit: 1000 })
            .pipe(
                map((areas) => {
                    return areas.results;
                }),
                tap((areas: GeneralMasterTables[]) => {
                    areas.forEach((area) => {
                        this.completeCircuitTypeDict[area.id] = area;
                    });
                    let list_tower = _.map(
                        areas.filter((value) =>
                            [
                                'Torres de refrigeració i Condensadors evaporatius',
                            ].includes(value.name)
                        ),
                        (area) => area.id
                    );
                    let list_rest_social_type_canteen = _.map(
                        areas.filter((value) =>
                            ['Restauració social'].includes(value.name)
                        ),
                        (area) => area.id
                    );

                    this.showService.setBehaviour(
                        'ref_tower',
                        list_tower
                    );
                    this.showService.setBehaviour(
                        'restauracion_social',
                        list_rest_social_type_canteen
                    );
                })
            )
            .subscribe();

        this._generalMasterTablesListFormService
            .submit({ type: 'indret_contact_relation', limit: 1000 })
            .pipe(
                map((areas) => {
                    return areas.results;
                }),
                tap((areas: GeneralMasterTables[]) => {
                    areas.forEach((area) => {
                        this.completeContactTypeDict[area.id] = area;
                    });
                    let list_contact_type = _.map(
                        areas.filter((value) =>
                            [
                                'Representante legal',
                                'Responsable técnico ambiental',
                            ].includes(value.name)
                        ),
                        (area) => area.id
                    );
                    this.showService.setBehaviour(
                        'required_contact_type',
                        list_contact_type
                    );
                })
            )
            .subscribe();
    }

    goBack(){
        this._router.navigateByUrl('indrets');
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    cancelEdit($event: MouseEvent): void {
        this._router.navigate(['..'], { relativeTo: this._activatedRoute });
    }

    /** Send the form to the server */
    submit(): void {
        //DOCUMENT
        this.formService.form.markAllAsTouched();
        let idDocument = this.formServiceDocument.form.get('data.id').value;
        let dataDocument = this.formServiceDocument.form.get('data').value;
        if (idDocument) {
            this.formServiceDocument = this._documentPartialUpdateService;
            this.formServiceDocument.form.reset({
                id: idDocument,
                data: dataDocument,
            });
        }
        let sent = true;
        const value_form = this.formService.form.get('data.circuits').value;

        value_form.forEach((circuit, index) => {
            if (circuit.is_active &&
                this.showService.canShow('ref_tower', [circuit.type]) &&
                !(this.filesForm
                    ?.get('files')
                    .value.map((file) => file.name)
                    .find((file) => file.includes('Alta')) || !!this.indret?.documents_data.find((file) => file.name.includes('Alta')))
            ) {
                sent = false;
            }
            if (
                !this.showService.canShow('restauracion_social', [circuit.type])
            ) {
                circuit.canteen = undefined;
            } else {
                if (
                    !this.showService.canShow(
                        'school_category_canteen',
                        this.formService.form.get('data.categories').value
                    )
                ) {
                    circuit.canteen = undefined;
                }
            }
            if(circuit.canteen){
                if(!circuit.canteen.is_supply_extern){
                    circuit.canteen.supply_company = undefined;
                }
                if(circuit.canteen.is_internal_management){
                    circuit.canteen.management_company = undefined;
                }
            }
            
        });
        const value_form_titular = this.formService.form.get('data').value;

        if (this.isEdit) {
            value_form_titular.titularity = undefined;
        } else {
            if (this.formService.form.get('data.titularity_id').value) {
                value_form_titular.titularity = undefined;
            } else {
                delete value_form_titular.titularity_id;
            }
        }

        if (sent) {
            this.formService
                .submit()
                .pipe(
                    takeUntil(this.unsubscribe$),
                    map((indret) => {
                        this.snackBar.open(
                            !this.isEdit
                                ? `S'ha creat un indret correctament`
                                : `S'ha editat un indret correctament`,
                            'Tancar',
                            { duration: 6000 }
                        );
                        if(!this.isEdit){
                            this._router.navigateByUrl('indrets');    
                        }
                        return indret;
                    }),
                    catchError((errors) => {
                        if (errors && errors.error) {
                            Utils.processServerErrors(
                                this.formService.form.controls.data['controls'],
                                errors.error
                            );

                            if(errors.error['titularity']){
                                Utils.processServerErrors(
                                    this._indretTitularCreateFS.form.controls.data['controls'],
                                    errors.error['titularity']
                                );
                            }

                            this.setErrors(errors.error);

                            this.snackBar.open(
                                `S'ha produït un error en guardar el indret. Revisi els camps marcats en vermell.`,
                                'Tancar',
                                { panelClass: ['red-snackbar'], duration: 6000 }
                            );
                           
                            return of();
                        }
                    }),
                    switchMap((indret) => {
                        if (indret && this.formServiceTitularPUpdate) {
                            return zip(
                                this.formServiceTitularPUpdate.submit(),
                                of(indret)
                            );
                        } else {
                            return of(indret);
                        }
                    }),
                    catchError((errors) => {
                        if (errors && errors.error) {           

                            if(errors.error){
                                Utils.processServerErrors(
                                    this.formServiceTitularPUpdate.form.controls.data['controls'],
                                    errors.error
                                );
                            }
                            let error = {'titularity' : errors.error}
                            this.setErrors(error);
                            this.snackBar.open(
                                `S'ha produït un error en actualitzar el titular. Revisi els camps marcats en vermell.`,
                                'Tancar',
                                { panelClass: ['red-snackbar'], duration: 6000 }
                            );
                            
                            return of();
                        }
                    }),
                    switchMap((indret) => {
                        if(indret){
                            if (this.filesForm?.value) {
                                return zip(
                                    this.submitDocuments(),
                                    indret['id'] ? of(indret) : of(indret[1])
                                );
                            } else {
                                return of([undefined,indret[1]]);
                            }
                        }else{
                            return of()
                        }
                    }),
                    switchMap((documents) => {
                        if (!documents['id']) {
                            this._partialUpdateService.reset({
                                data: documents[1],
                                id: documents[1].id,
                            });
                            this._partialUpdateService.patch({
                                data: { documents: documents[0] },
                            });
                            return this._partialUpdateService.submit();
                        } else {
                            return of(documents);
                        }
                    }), 
                )
                .subscribe(value => this._router.navigateByUrl('indrets'));
        } else {
            this.snackBar.open(
                `Teniu un circuit de Torres de refrigeració i condensadors evaporatiu que necessita un document Comunicación de Alta`,
                'Tancar',
                { panelClass: 'error', duration: 6000 }
            );
        }
    }

    updateIndret(module?): void {
        let id = this.formService.form.get('data.id').value;
        let data = this.formService.form.get('data').value;
        let ids = [];
        switch (module) {
            case 'document':
                this.filesForm.value.files.forEach((fil) => {
                    ids.push(fil.id);
                });
                data.documents = ids;
                this.formService = this._partialUpdateService;
                this.formService.form.reset({ data: data, id: id });
                break;
        }
        this.formService
            .submit({ data: data, id: id })
            .pipe(
                takeUntil(this.unsubscribe$),
                catchError((errors) => {
                    this.snackBar.open(
                        `S'ha produït un error en guardar el indret. Revisi els camps marcats en vermell.`,
                        'Tancar',
                        { panelClass: 'red-snackbar', duration: 6000 }
                    );
                    Utils.processServerErrors(
                        this.formService.form.controls.data['controls'],
                        errors.error
                    );
                    return of({});
                })
            )
            .subscribe();
    }

    //DOCUMENTS
    setDocument(documents): void {
        this.filesForm = documents.filesForm;
        this.files.push(documents.files[0]);
    }

    submitDocuments(): Promise<any> {
        const observables = [];
        const promises = [];

        // Prepare and submit the forms
        if (this.filesForm.value.files) {
            this.filesForm.value.files.forEach((file, index) => {
                if (!file.id) {
                    // On file creation, upload the  file and then save the file object with the image upload reference
                    const p = this.uploadFile(this.files[index]);
                    promises.push(p);
                    p.then((data: DocumentLibraryFileUpload) => {
                        observables.push(this.saveFile(file, index, data.uuid));
                    });
                }
            });
        }
        return new Promise((resolve, reject) => {
            if (promises.length > 0) {
                Promise.all(promises).then(
                    () => {
                        return forkJoin(observables).subscribe(() => {
                            resolve(
                                this.currentFiles
                                    .map((f) => f.id)
                                    .concat(
                                        this.filesForm.value.files.map(
                                            (f) => f.id
                                        )
                                    )
                            );
                        });
                    },
                    () => reject
                );
            } else {
                resolve(this.currentFiles.map((f) => f.id));
            }
        });
    }

    /**
     * Save one image in the database
     * @param file The file details (name and description) to upload
     * @param index
     * @param uuid The uuid of the image (returned by the uploadFile method)
     */
    saveFile(file, index, uuid?: string): Observable<DocumentLibrary> {
        return this._documentCreateService
            .submit({
                data: {
                    name: file.name,
                    title: file.title,
                    visible: file.visible,
                    description: file.description,
                    category: file.category,
                    document: uuid,
                },
            })
            .pipe(
                takeUntil(this.unsubscribe$),
                delay(1000),
                tap((result) => {
                    this.filesForm
                        .get(['files', index])
                        .patchValue({ id: result.id });
                })
            );
    }

    uploadFile(blob): Promise<DocumentLibraryFileUpload> {
        const formData: FormData = new FormData();
        formData.append('document', blob);
        return this.http
            .post<DocumentLibraryFileUpload>(
                this.apiConfigService.options.apiUrl +
                    `/document_library/upload/`,
                formData
            )
            .toPromise();
    }

    setErrors(errorServer) {
        this.errors = {
            titularity: undefined,
            general: undefined,
            contacts: undefined,
            circuits: undefined,
            health_registry: undefined,
        };
        if (errorServer) {

            if (errorServer['titularity']) {
                this.errors['titularity'] = errorServer['titularity'];
                if (errorServer['indret_contacts'] && errorServer['indret_contacts'].length == 1) {
                    this.errors['titularity']['indret_contacts'] =
                        errorServer['indret_contacts'][0];
                }
            }

            if (errorServer['indret_contacts']) {
                if (errorServer['indret_contacts'].length == 1) {
                    if(!this.errors['titularity']){
                        this.errors['titularity'] = {};
                    }
                    this.errors['titularity']['indret_contacts'] =
                        errorServer['indret_contacts'][0];
                }
                if (errorServer['indret_contacts'].slice(1).length > 0) {
                    this.errors['contacts'] =
                        errorServer['indret_contacts'].slice(1);
                }
            }

            if (errorServer['circuits']) {
                this.errors['circuits'] = errorServer['circuits'];
                delete errorServer['circuits'];
            }
            if (errorServer['health_registry']) {
                this.errors['health_registry'] = errorServer['health_registry'];
            }
            this.errors['general'] = errorServer;
            if (keys(this.errors['general']).length < 1) {
                this.errors['general'] = null;
            }
            console.log(this.errors);
        }
    }

    getErrors(value?) {
        if (value) {
            return this.errors[value];
        } else {
            return this.errors;
        }
    }

    cancelIndret(){
        const dialogRef = this._matDialog.open(
            DescriptionDialogComponent,
            {
                autoFocus: false,
                data: {
                    title: 'Es donarà de baixa al indret',
                },
                panelClass: 'fuse-confirmation-dialog-panel',
                width:'500px'
            }
        );
        dialogRef.afterClosed().pipe(
            map( value => value),
            switchMap(result => this.formService.submit({id:this.indret.id,data:{deactivation_reason:result,is_active:false}})),
            switchMap(result => { this._router.navigateByUrl('indrets'); return of(this._matSnackBar.open("S'ha donat de baixa al indret correctament.",'Tancar'))}),
            catchError( error => of(this._matSnackBar.open("S'ha produït un error en donar de baixa.",'Tancar')))
            ).subscribe();
        
    }

    subscribeIndret(){
        this.formService.form.patchValue({data:{is_active:true,deactivation_reason:null}});
        this.formService.form.enable();
        this.formService.submit().pipe(
            tap( value => 
                this._matSnackBar.open("S'ha donat d'alta al indret correctament.",'Tancar')
            ),
            catchError( error => {
                return of(this._matSnackBar.open("S'ha produït un error en donar d'alta.",'Tancar'));
            })
        ).subscribe()
    }


}
