import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
    GeneralMasterTablesListFormService,
    IndretCreateFormService,
    IndretPartialUpdateFormService,
    IndretTitularCreateFormService,
    IndretTitularPartialUpdateFormService,
} from 'api/form-service';
import { DocumentLibrary, GeneralMasterTables } from 'api/model';
import { AreaAutocompleteComponent } from 'app/utils/components/autocompletes/area-autocomplete/area-autocomplete.component';
import _ from 'lodash';
import { Subject, map, tap } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../../../@bcn/components/dialogs/confirm/confirm.component';
import { OptionsDialogComponent } from '../../../../../../@bcn/components/dialogs/options/options.component';
import { IndretTitularListFormService } from '../../../../../../api/forms/indret-titular/list/list.service';
import { AddressGeoFormComponent } from 'app/utils/components/geobcn/address-geo/address-geo-form/address-geo-form.component';
import { RoadGeoFormComponent } from 'app/utils/components/geobcn/road-geo/road-geo-form/road-geo-form.component';
import { RoadtypeGeoFormComponent } from 'app/utils/components/geobcn/roadtype-geo/roadtype-geo-form/roadtype-geo-form.component';

@Component({
    selector: 'app-indrets-titulars',
    templateUrl: './titulars.component.html',
    styleUrls: ['./titulars.component.scss'],
})
export class TitularsComponent {
    // extends SipsForm<any, any> {

    titularyIndret = [];
    addressIndret = [];
    hasAddressIndret = 0;
    autocompleteTitularData = false;
    is_duplicar = false;
    completeTypeDict: any = {};
    completeTypeList: any = [];

    categories$;

    formTitular:
        | IndretTitularCreateFormService
        | IndretTitularPartialUpdateFormService;
        
    formIndret: IndretCreateFormService | IndretPartialUpdateFormService;

    id_rep_legal = 0;

    @Input()
    documents_data: DocumentLibrary[];
    
    @Input()
    isEdit: boolean;

    @Input()
    errors;

    @ViewChild(AreaAutocompleteComponent)
    areaAutocomplete: AreaAutocompleteComponent;
    @ViewChild(AddressGeoFormComponent)
    addressGeoForm: AddressGeoFormComponent;
    @ViewChild(RoadGeoFormComponent)
    roadGeoForm: RoadGeoFormComponent;
    @ViewChild(RoadtypeGeoFormComponent)
    roadTypeGeoForm: RoadtypeGeoFormComponent;

    // Private
    private _notify: Subject<void>;

    constructor(
        private _createTitularsFS: IndretTitularCreateFormService,
        private _partialUpdateTitularFS: IndretTitularPartialUpdateFormService,
        private _indretTitularListFormService: IndretTitularListFormService,
        private _createIndretFS: IndretCreateFormService,
        private _partialUpdateIndretFS: IndretPartialUpdateFormService,
        private _generalMasterTablesListFormService: GeneralMasterTablesListFormService,
        private _router: Router,
        private _matDialog: MatDialog
    ) {}

    ngOnInit() {
        this.getData();

        if (this._createIndretFS.form.get('data').value && !this.isEdit) {
            this.formIndret = this._createIndretFS;
            this.formTitular = this._createTitularsFS;

            this.formTitular.form.valueChanges.subscribe((value) => {
                this.formIndret.form
                    .get('data')
                    .patchValue({ titularity: value.data });
            });

            this.formTitular.form.get('data.province').setValue('Barcelona');
            this.formTitular.form.get('data.population').setValue('Barcelona');
            this.formTitular.form.get('data.is_legal_entity').setValue(false);
            
            this.formIndret.addDataIndretContacts(undefined, undefined, {
                scope_is_alimentary: false,
            });
        } else {
            this.formIndret = this._partialUpdateIndretFS;
            this.formTitular = this._partialUpdateTitularFS;

            let dialogRef = undefined;
            this.formTitular.form.valueChanges.subscribe((value) => {
                
                if (this.formTitular.form.dirty && !this.is_duplicar && !dialogRef) {
                        dialogRef = this._matDialog.open(
                            ConfirmDialogComponent,
                            {
                                autoFocus: false,
                                data: {
                                    title: 'Vol crear el mateix Indret amb un altre Titular?',
                                },
                                panelClass: 'fuse-confirmation-dialog-panel',
                            }
                        );
                        dialogRef.afterClosed().subscribe((result) => {
                            if (result) {
                                this.formIndret.form
                                    .get('data.titularity')
                                    .reset();
                                this.formIndret.form
                                    .get('data.titularity_id')
                                    .reset();
                                this.formIndret.form.get('data.id').reset();
                                let indret =this.formIndret.form.get('data').value
                                indret['documents_data']=this.documents_data;
                                localStorage.setItem(
                                    'form',
                                    JSON.stringify(indret)
                                );
                                this._router.navigateByUrl('/indrets/new');
                            } else {
                                this.is_duplicar = true;
                            }
                        });
                }
            });
        }
    }

    getData(): void {
        this.categories$ = this._generalMasterTablesListFormService
            .submit({ type: 'indret_contact_relation', limit: 1000 })
            .pipe(
                map((areas) => {
                    return areas.results;
                }),
                tap((areas: GeneralMasterTables[]) => {
                    this.id_rep_legal = areas.filter(
                        (area) => area.name == 'Representante legal'
                    )[0].id;
                    areas.forEach((area) => {
                        this.completeTypeDict[area.id] = area;
                    });
                    this.completeTypeList = _.map(areas, (area) => {
                        return { id: area.id, name: area.name };
                    });
                    this.formIndret.form
                        .get('data.indret_contacts.0')
                        .patchValue({ relation: this.id_rep_legal });
                })
            );
    }

    addDataEmails(email): void {
        let emails = this.formTitular.form.get('data.emails').value;
        if (!emails) {
            emails = [];
        }
        emails.push(email);
        this.formTitular.form.get('data.emails').setValue(emails);
    }

    removeDataEmails(email): void {
        let emails = this.formTitular.form.get('data.emails').value;
        let index = emails.findIndex((e) => e === email);
        if (index > -1) {
            emails.splice(index, 1);
            this.formTitular.form.get('data.emails').setValue(emails);
        }
    }
    validatorsPQS(identification: string): boolean {
        return (
            identification?.toUpperCase().includes('P') ||
            identification?.toUpperCase().includes('Q') ||
            identification?.toUpperCase().includes('S')
        );
    }

    changeIsPublic(): void {
        this.autocompleteTitularData = false;
        this.formTitular.form.get('data').patchValue({
            tax_exempt: true,
        });
    }

    toUpper(field): void {
        this.formTitular.form.get('data.'+field).setValue(this.formTitular.form.get('data.'+field).value.toUpperCase());
    }


    changeUpperCase(input): string {
        return input.value.toUpperCase().replace('.',"");
    }

    checkTitular(change): void {
        this.autocompleteTitularData = false;
        let params;
        switch (change) {
            case 'identification':
                if (this.formTitular.form.get('data.' + change).value) {
                    params = {
                        identification__iexact: this.formTitular.form.get(
                            'data.' + change
                        ).value,
                    };
                }
                break;
            case 'social_reason':
                if (this.formTitular.form.get('data.' + change).value) {
                    params = {
                        social_reason__iexact: this.formTitular.form.get(
                            'data.' + change
                        ).value,
                    };
                }
                break;
            case 'CIF':
                if (this.formTitular.form.get('data.' + change).value) {
                    params = {
                        CIF__iexact: this.formTitular.form.get('data.' + change)
                            .value,
                    };
                }
                break;
            case 'last_name':
                if (
                    this.formTitular.form.get('data.first_name').value &&
                    this.formTitular.form.get('data.' + change).value
                ) {
                    params = {
                        full_name_filter:
                            this.formTitular.form.get('data.first_name').value +
                            ',' +
                            this.formTitular.form.get('data.' + change).value,
                    };
                }
                break;
        }
        if (params) {
            this._indretTitularListFormService
                .submit(params)
                .subscribe((titular) => {
                    if (titular.results.length != 0) {
                        let list = [];
                        titular.results.forEach((tit, i) => {
                            list.push({
                                id: i,
                                name:this.getName(tit),
                            });
                        });
                        const dialogRef = this._matDialog.open(
                            OptionsDialogComponent,
                            {
                                autoFocus: false,
                                data: {
                                    title: 'Ja existeix un titular amb aquestes dades',
                                    text: "Vols emplenar les dades d'aquest titular automàticament?",
                                    list: list,
                                },
                                panelClass: 'fuse-confirmation-dialog-panel',
                            }
                        );
                        dialogRef.afterClosed().subscribe((result) => {
                            if (result) {
                                this.autocompleteTitularData = true;
                                this.formTitular.form
                                    .get('data')
                                    .patchValue(titular.results[result.id]);
                                this.formIndret.form
                                    .get('data.titularity_id')
                                    .patchValue(titular.results[result.id].id);
                            }
                        });
                    }
                });
        }
    }

    changeCIF(): void {
        this.titularyIndret = [];
        let identificationCIF = this.formTitular.form.get('data.CIF').value;
        if (this.validatorsPQS(identificationCIF)) {
            this.formTitular.form.get('data.is_public').setValue(true);
            this.formTitular.form.get('data.tax_exempt').setValue(true);
            this.formTitular.form.get('data.tax_exempt').disable();
        } else {
            this.formTitular.form.get('data.tax_exempt').enable();
        }
    }

    changeIsLegalEntity(): void {
        this.formTitular.form.patchValue({
            data: {
                    is_legal_entity: this.formTitular.form.get('data.is_legal_entity').value,
                    social_reason:null,
                    first_name:null,
                    last_name:null,
                    second_last_name:null,
                    CIF:null,
                    identification:null,
                    identification_type:null,
                },
        });

        if(this.formTitular.form.get('data.is_legal_entity').value){
            this.formTitular.form.patchValue({
                data: {
                        is_public: false,
                    },
            });
        }
    }


    getName(titularity){ 
        let result = "";
        if(titularity) {
            if(titularity.is_legal_entity){
                    result += titularity.social_reason;
                    result += " ";
                    result += titularity.CIF ;
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

    removeTitular(): void {
        this.formIndret.form.get('data.titularity_id').reset(undefined);
        const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
            autoFocus: false,
            data: {
                title: 'Desvincular Titular',
                text: 'Vols mantenir les dades emplenades o vols esborrar-les?',
                buttonAux: 'Mantenir',
                buttonConfirm: 'Esborrar',
            },
            panelClass: 'fuse-confirmation-dialog-panel',
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result === true) {
                this.autocompleteTitularData = false;
                this.formTitular.form.get('data').reset();
            } else if (result === 'auxtrue') {
                this.formTitular.form.get('data').patchValue(null);
                this.autocompleteTitularData = false;
            }
        });
    }

    getErrorsAddress(){
        return this.errors?.street_name || this.errors?.start_number_name || this.errors?.type_of_road_name || this.errors?.population || this.errors?.province
    }
}
