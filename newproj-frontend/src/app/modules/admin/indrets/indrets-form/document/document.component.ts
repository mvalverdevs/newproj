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

import { DocumentLibraryCreateFormService, DocumentLibraryDeleteFormService, DocumentLibraryPartialUpdateFormService, IndretPartialUpdateFormService } from 'api/form-service';

@Component({
    selector: 'app-indrets-document',
    templateUrl: './document.component.html',
    styleUrls: ['./document.component.scss']
})
export class DocumentComponent
    extends SipsForm<DocumentLibraryCreateFormService|DocumentLibraryPartialUpdateFormService, any> {

    isEdit: boolean;
    errors = [];

    @Input()
    indret: Indret;


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
        private _generalMasterTablesListFormService: GeneralMasterTablesListFormService,
        private _createDocuments: DocumentLibraryCreateFormService,
        private _deleteDocuments: DocumentLibraryDeleteFormService,
        private _partialUpdateIndret: IndretPartialUpdateFormService,
    ) {
        super(_matSnackBar);
        // Create fileForm
        this.filesForm = this.formBuilder.group({
            files: this.formBuilder.array([])
        });
    }


    ngOnInit() {
        this.isEdit = !!this.indret;

        this.getData();

        this.formService = this._createDocuments;

        if(this.indret?.documents_data){
            this.indret.documents_data.forEach(value =>{
                //HACK
                value.name = value.name.split('.')[0]+'_'+value.id+'.'+value.name.split('.')[1];
                let control = <FormArray>this.filesForm['controls']['files']
                let fg = new FormControl(value)
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

    getData(): void {
        this._generalMasterTablesListFormService.submit({type: 'indret_document_type'})
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((areas) => {
                areas.results.forEach(area => {
                    this.completeTypeDict[area.id] = area;
                })
            });
    }

    updateFiles(): void {
        this.files.forEach(file => {
            // Check if the file is already added
            let alreadyAdded = false;
            if (this.filesForm?.value?.files) {
                this.filesForm.value.files.forEach(
                    f => (alreadyAdded = alreadyAdded || f.name === file.name)
                );
            }

            if (!alreadyAdded) {
                this.createFile(file);
            }
        });
    }

    createFile(file): void {

        const files = this.filesForm?.get('files') as FormArray;
        let type = '';
            switch (this.completeTypeDict[this.formService.form.value.data.type].name) {
                case 'Capacitació tècnica':
                    type = 'Tecnica';
                    break;
                case 'Comunicació Modificació':
                    type = 'Modificacio';
                    break;
                case 'Comunicacion Modificación':
                    type = 'Modificacion';
                    break;
                case 'Comunicació Alta':
                    type = 'Alta';
                    break;
                case 'Comunicació Baixa':
                    type = 'Baixa';
                    break;
                case 'Registre/Autorització sanitaria':
                    type = 'Registre';
                    break;
            }
    
            let time = moment().format('DDMMYY');
            // file.name.split('.')[0] + '_' +
            let name = type + '_' + time + '_ID' + '.' + file.name.split('.')[1];
            const fg = this.formBuilder.group({
                name: name,
                type: this.formService.form.get('data.type').value,
                id: null
            });
            this.formService.form.get('data.type').setValue(undefined);
            this.areaAutocompleteComponent.modelArea = undefined
    
            files.push(fg);
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
                if(file.id){
                    const values = this._partialUpdateIndret.form.get('data.documents').value
                    this._partialUpdateIndret.form.get('data').patchValue({'documents':values.filter(value=>value!=file.id)})
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
            const values = this._partialUpdateIndret.form.get('data.documents').value
            this._partialUpdateIndret.form.get('data').patchValue({'documents':values.filter(value=>value!=file.id)})
            this._deleteDocuments.submit(file.id);
        }
        //this.entity.document_storage.splice(this.entity.document_storage.indexOf(file.id), 1);
    }

    ngOnChanges(change: SimpleChanges) {
        super.ngOnChanges(change);
      }

    goToFile(i){
        window.open(this.indret.documents_data[i].document,'_blank');
    }
}
