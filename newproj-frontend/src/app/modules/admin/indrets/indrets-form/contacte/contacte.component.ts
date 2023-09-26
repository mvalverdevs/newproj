import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup, } from "@angular/forms";
import { GeneralMasterTablesListFormService, IndretCreateFormService, IndretPartialUpdateFormService } from 'api/form-service';
import { map, of } from "rxjs";
import { SelectAutocompleteComponent } from "../../../../../utils/components/autocompletes/select-autocomplete/select-autocomplete.component";
import { ExampleAutocompleteComponent } from "../../../../../utils/components/autocompletes/example-autocomplete/example-autocomplete.component";
import { IndretControlsService } from '../indrets.service';

@Component({
    selector: 'app-indrets-contacte',
    templateUrl: './contacte.component.html',
    styleUrls: ['./contacte.component.scss']
})
export class ContacteComponent {

    @Input()
    isEdit: boolean;
    
    @Input()
    errors = [];

    list_types = [];
    categories$;

    inputFormService: IndretCreateFormService | IndretPartialUpdateFormService ;

    // listContact: FormArray = new FormArray<IndretContact>([]);
    @ViewChild('category') exAutocompleteComponent: SelectAutocompleteComponent;
    @ViewChild(SelectAutocompleteComponent) SelectAutocompleteComponent: SelectAutocompleteComponent;
    @ViewChild('selectDNI') selectDNI: SelectAutocompleteComponent;

    formContact: FormGroup;

    constructor(
        private showService:IndretControlsService,
        private _createIndretFs:IndretCreateFormService,
        private _partialUpdateIndretFs:IndretPartialUpdateFormService,
        private _generalMasterTablesListFormService: GeneralMasterTablesListFormService,
    ) {
        this.getData();
    }

    ngOnInit() {
        if(this.isEdit){
            this.inputFormService = this._partialUpdateIndretFs;
        } else {
            this.inputFormService = this._createIndretFs;
        }

    }

    getData(){
        this.categories$ = this._generalMasterTablesListFormService
            .submit({ type: 'indret_contact_relation', limit: 1000 })
            .pipe(
                map((areas) => {
                    areas.results = areas.results.filter((area) => area.name != 'Representante legal');
                    return areas.results;
                }),
            );
    }

    changeIsAlimentary(i,event){
       this.changeList();
        if(this.inputFormService.form.get(`data.indret_contacts.${i}.scope_is_alimentary`).value){
            this.exAutocompleteComponent.select$ = of([]);
            this.exAutocompleteComponent.select$ = of(this.list_types.filter(select => !select.name.includes('técnico')));
        } else {
            this.exAutocompleteComponent.select$ = of([]);
            this.exAutocompleteComponent.select$ = of(this.list_types);
        }
    }
    
    addContact() {
        this.inputFormService.addDataIndretContacts();
    }
    
    deleteContact(index: number) {
        this.inputFormService.removeDataIndretContacts(index);
    }

    getName(contact,i){
        let result = "Contact " + i;

        if(contact?.value?.first_name && contact?.value?.last_name){
            result = contact.value.first_name + " " + contact.value.last_name;
            console.log(this.exAutocompleteComponent.selectData);
            if(contact?.value?.relation && this.exAutocompleteComponent && this.exAutocompleteComponent.selectData.length>0){
                result = result +' - '+this.exAutocompleteComponent.selectData.filter(example => example.id== contact?.value?.relation)[0]?.name
            }
        }


        return result;
    }

    changeList(){
        this.list_types = this.exAutocompleteComponent.selectData.filter( example => !example.name.includes('legal'));
    }

    getError(i:number,field:string){
        let result = [];
        if(this.errors && this.errors[i] && this.errors[i][field]){
            result = this.errors[i][field]
        }   
        return result;
    }
}
