import { HttpClient } from "@angular/common/http";
import { Component, Input, ChangeDetectorRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";
import { APIConfigService } from "api/apiconfig.service";
import { IndretActionCreateFormService, IndretActionPartialUpdateFormService, IndretTitularPartialUpdateFormService, IndretTitularCreateFormService, DocumentLibraryCreateFormService, DocumentLibraryPartialUpdateFormService, IndretListFormService, GeneralMasterTablesListFormService } from "api/form-service";
import { GeneralMasterTables, DocumentLibrary, Indret, DocumentLibraryFileUpload, IndretAction, IndretList, ActionDocument } from "api/model";
import { FormService, SipsForm } from "app/utils/sipsForm.class";
import { Utils } from "app/utils/utils";
import { keys, values } from "lodash";
import moment from "moment";
import { takeUntil, tap, switchMap, zip, of, catchError, forkJoin, Observable, delay, map } from "rxjs";


export const MY_DATE_FORMATS = {
    parse: {
        dateInput: ['l','LL'],
    },
    display: {
        dateInput: 'dd/MM/yyyy',
        monthYearLabel: 'MMM yyyy',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'app-actions-form',
    templateUrl: './actions-form.component.html',
    styleUrls: ['./actions-form.component.scss'],
    providers:[{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },]
})
export class ActionsFormComponent extends SipsForm<IndretActionCreateFormService | IndretActionPartialUpdateFormService, IndretAction> {
    submitBtnText: string;
    isEdit: boolean;
    errors = [];

    completeTypeDict: { number?: GeneralMasterTables } = {};
    completeCategoryDict: { number?: GeneralMasterTables } = {};

    formServiceDocument: FormService<any>;

    currentFiles: DocumentLibrary[] = [];
    files: DocumentLibrary[] = [];
    filesForm: FormGroup;

    indretParam: string;

    @Input()
    action: IndretAction;

    @Input()
    isNew: boolean;

    constructor(
        private _partialUpdateService: IndretActionPartialUpdateFormService,
        private _createService: IndretActionCreateFormService,
        private _documentCreateService: DocumentLibraryCreateFormService,
        private _documentPartialUpdateService: DocumentLibraryPartialUpdateFormService,
        private _indretListFS: IndretListFormService,
        private _router: Router,
        private http: HttpClient,
        private _activatedRoute: ActivatedRoute,
        private apiConfigService: APIConfigService,
        private _matSnackBar: MatSnackBar,
        private changeDetectorRef: ChangeDetectorRef,
        private _generalMasterTablesListFormService: GeneralMasterTablesListFormService,
        private cdRef: ChangeDetectorRef,
    ) {
        super(_matSnackBar);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        // /** Determines if we are adding a new user or editing a current one */
        this.isEdit = !!this.action;
        this.getData();
        if (!this.isEdit) {
            this.submitBtnText = 'Crear';
            this.formService = this._createService;
            this.formServiceDocument = this._documentCreateService;
            
        } else {
            this.formService = this._partialUpdateService;
            this.formServiceDocument = this._documentCreateService;
            this.submitBtnText = 'Guardar';
        }
        super.ngOnInit();
    }

    ngAfterViewInit(){
        if(this.isEdit){
            this.formService.reset({
                id: this.isNew ? null : this.action?.id,
                data: this.action,
            });
            // this.files=this.action.documents;
        }
    }

    getData() { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    cancelEdit($event: MouseEvent): void {
        this._router.navigate(['..'], { relativeTo: this._activatedRoute });
    }


    /** Send the form to the server */
    submit(): void {
        let date;
        this.formService.form.patchValue({expand:'~all'});
        //DOCUMENT
        let idDocument = this.formServiceDocument.form.get('data.id').value;
        let dataDocument = this.formServiceDocument.form.get('data').value;
        if (idDocument) {
            this.formServiceDocument = this._documentPartialUpdateService;
            this.formServiceDocument.form.reset({id: idDocument, data: dataDocument});
        }
        keys(this.formService.form.get('data').value).filter(key=>key.includes('date')).forEach(key_date=>{ 
            if(this.formService.form.get('data').value[key_date]){
                date = moment(this.formService.form.get('data').value[key_date].toString());
                this.formService.form.get('data.'+key_date).patchValue(date.format('yyyy-MM-DD'));
            }
        });
        const value_form_titular = this.formService.form.get('data').value;
        value_form_titular.minute = undefined;
        value_form_titular.interested = undefined;
        value_form_titular.sample_points = undefined;

        this.formService
            .submit()
            .pipe(
                takeUntil(this.unsubscribe$),
                tap((action) => {
                    this._router.navigate(['/actions'])
                    this.snackBar.open(
                        `S'ha creat una actuacion correctament`,
                        'Tancar',
                        { duration: 6000 }
                    );
                }),
                catchError((errors) => {
                    if (errors && errors.error) {
                        Utils.processServerErrors(
                            this.formService.form.controls.data['controls'],
                            errors.error
                        );

                        this.snackBar.open(
                            `S'ha produït un error en guardar el indret. Revisi els camps marcats en vermell.`,
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
                    console.log(documents);
                    if (!documents['id']) {
                        this._partialUpdateService.reset({
                            data: documents[1],
                            id: documents[1].id,
                        });
                        documents[0].forEach((doc,index)=>{
                            this._partialUpdateService.form.get('data.documents.'+index).patchValue({document:doc.id});
                        })
                        return this._partialUpdateService.submit();
                    } else {
                        return of(documents);
                    }
                }), 
            )
            .subscribe(value => this._router.navigateByUrl('actions'));
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
                        `S'ha produït un error en guardar el action. Revisi els camps marcats en vermell.`,
                        'Tancar',
                        { panelClass: 'red-snackbar', duration: 6000 }
                    );

                    this.errors = [];
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
            if(!file.id){
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
            Promise.all(promises).then(() => {
                return forkJoin(observables).subscribe(() => {
                    resolve(this.currentFiles.concat(this.filesForm.value.files));
                });
            }, () => reject);
        } else {
            resolve(this.currentFiles.map(f => f.id));
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
    return this._documentCreateService.submit({
        data: {
            name: file.name,
            document: uuid
        }
    }).pipe(
        takeUntil(this.unsubscribe$),
        delay(1000),
        tap(result => {
            this.filesForm.get(['files', index]).patchValue({id: result.id});
        }),
    );
}

uploadFile(blob): Promise<DocumentLibraryFileUpload> {
        const formData: FormData = new FormData();
        formData.append('document', blob);
        return this.http.post<DocumentLibraryFileUpload>(this.apiConfigService.options.apiUrl + `/document_library/upload/`, formData).toPromise();     
    }

    goBack() {
        this._router.navigateByUrl('actions');
    }

}
