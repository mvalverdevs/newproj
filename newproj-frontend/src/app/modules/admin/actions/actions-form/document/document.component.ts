import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import moment from "moment";
import { takeUntil } from "rxjs/operators";
import { DeleteDialogComponent } from "../../../../../../@bcn/components/dialogs/delete/delete.component";
import { DocumentLibrary } from "../../../../../../api/defs/DocumentLibrary";
import { Indret } from "../../../../../../api/defs/Indret";
import { GeneralMasterTablesListFormService } from "../../../../../../api/forms/general-master-tables/list/list.service";
import {
    AreaAutocompleteComponent
} from "../../../../../utils/components/autocompletes/area-autocomplete/area-autocomplete.component";
import { SipsForm } from "../../../../../utils/sipsForm.class";

import { DocumentLibraryCreateFormService, DocumentLibraryDeleteFormService, DocumentLibraryPartialUpdateFormService, IndretActionCreateFormService, IndretActionPartialUpdateFormService, IndretPartialUpdateFormService } from 'api/form-service';
import { IndretAction } from 'api/model';

@Component({
    selector: 'app-actions-document',
    templateUrl: './document.component.html',
    styleUrls: ['./document.component.scss']
})
export class DocumentComponent
    extends SipsForm<DocumentLibraryCreateFormService, any> {

    formAction : IndretActionCreateFormService | IndretActionPartialUpdateFormService;
    isEdit: boolean;
    errors = [];
    enumTypeDocument =[
        {id:'invoice',name:'Factura'},
        {id:'label',name:'Etiqueta'},
        {id:'tech_invoice',name:'F. Técnica'},
        {id:'sec_invoice',name:'F. Seguretat'},
        {id:'photo',name:'Foto'},
        {id:'contract',name:'Contracte'},
        {id:'appcc',name:'APPCC'},
        {id:'psa',name:'PSA'},
        {id:'minute',name:'Acta'},
        {id:'report',name:'Informe'},
        {id:'others',name:'Otros'},
    ]
    typeDictDocument={
        'invoice':'Factura',
        'label':'Etiqueta',
        'tech_invoice':'F. Técnica',
        'sec_invoice':'F. Seguretat',
        'photo':'Foto',
        'contract':'Contracte',
        'appcc':'APPCC',
        'psa':'PSA',
        'minute':'Acta',
        'report':'Informe',
        'others':'Otros',
    }

    @Input()
    action: IndretAction;


    @Input()
    documentsErrors = {};

    @Input()
    isNew: boolean;

    @Output()
    returnDocument = new EventEmitter();


    documents: DocumentLibrary[] = [];
    completeTypeDict: any = {};

    // Files
    currentFiles: DocumentLibrary[] = [];
    files: DocumentLibrary[] = [];
    lastInvalids: File[] = [];
    displayedColumns = ['name', 'size', 'type'];
    filesForm: FormGroup;

    @ViewChild(AreaAutocompleteComponent) areaAutocompleteComponent: AreaAutocompleteComponent;

    constructor(
        private _matSnackBar: MatSnackBar,
        private formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private _createActionFS: IndretActionCreateFormService,
        private _patchActionFS: IndretActionPartialUpdateFormService,
        private _generalMasterTablesListFormService: GeneralMasterTablesListFormService,
        private _createDocuments: DocumentLibraryCreateFormService,
        private _deleteDocuments: DocumentLibraryDeleteFormService,
    ) {
        super(_matSnackBar);
        // Create fileForm
        this.filesForm = this.formBuilder.group({
            files: this.formBuilder.array([])
        });
    }


    ngOnInit() {
        this.isEdit = !!this.action;

        if(this.isEdit){
            this.formAction=this._patchActionFS;
        } else {
            this.formAction=this._createActionFS;

        }

        this.formService = this._createDocuments;

        if(this.action?.documents){
            this.action.documents.forEach(value =>{
                let control = <FormArray>this.filesForm['controls']['files']
                let fg = new FormControl(value);
                control.push(fg);
            })
        }

        super.ngOnInit();
    }


    /************************************
     *  FILE METHODS
     ************************************/

    getInvalids(event): void {
        this.lastInvalids = event;
    }

    getFiles(event): void {
        this.files = event;
        this.updateFiles();
    }


    updateFiles(): void {
        this.files.forEach(file => {
            // Check if the file is already added
            let alreadyAdded = this.filesForm.value.files.find((f) => {return f.name === file.name}) || false;
            if (!alreadyAdded) {
                this.createFile(file);
            }
        });
    }

    createFile(file): void {
        const files = this.filesForm?.get('files') as FormArray;
        const fg = this.formBuilder.group({
            name: file.name,
            type: this.formService.form.get('data.type').value,
            id: null
        });
        files.push(fg);
        this.formAction.addDataDocuments(
            undefined,
            undefined,
            { type:this.formService.form.get('data.type').value,
            file_name:file.name}
        )
        console.log(this.formAction.form)
        this.returnDocument.emit({filesForm: this.filesForm, files: this.files});
    }

    removeValidFile(index): void {
        const dialogRef = this._matDialog.open(DeleteDialogComponent, {
            autoFocus: false,
            data: {
                title: 'Esteu segur que voleu suprimir.',
                text: this.isEdit ? "El document s'esborrarà permanent.":""
            },
            panelClass: 'fuse-confirmation-dialog-panel',
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.files.splice(index, 1);
                const files = this.filesForm.get('files') as FormArray;
                const file = this.filesForm.get('files.'+index).value;
                this.formAction.removeDataDocuments(index);
                if(file.id){
                    this._deleteDocuments.submit({id:file.id});
                }

                files.removeAt(index);

            }
        });


    }

    removeInvalids(): void {
        this.lastInvalids = [];
    }

    deleteFile(file): void {
        if(!file.id){
            this.currentFiles.splice(this.currentFiles.indexOf(file), 1);
        } else{
            this._deleteDocuments.submit(file.id);
        }
        //this.entity.document_storage.splice(this.entity.document_storage.indexOf(file.id), 1);
    }

    ngOnChanges(change: SimpleChanges) {
        super.ngOnChanges(change);
    }
}
