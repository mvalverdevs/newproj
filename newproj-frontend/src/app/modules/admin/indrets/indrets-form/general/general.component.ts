import {Component, Input, SimpleChanges, ViewChild} from '@angular/core';
import {SipsForm} from "../../../../../utils/sipsForm.class";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Indret} from "../../../../../../api/defs/Indret";
import {IndretCreateFormService} from "../../../../../../api/forms/indret/create/create.service";
import {IndretPartialUpdateFormService} from "../../../../../../api/forms/indret/partialUpdate/partialUpdate.service";
import {IndretListFormService} from "../../../../../../api/forms/indret/list/list.service";
import { Moment, now } from 'moment';
import moment from 'moment';
import { GeneralMasterTablesListFormService } from 'api/forms/general-master-tables/list/list.service';
import { takeUntil,map,tap } from 'rxjs';
import _ from 'lodash';
import { IndretControlsService } from '../indrets.service';

@Component({
    selector: 'app-indrets-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss']
})
export class GeneralComponent {

    submitBtnText: string;
    addressIndret = [];
    hasAddressIndret = 0;


    data_PNCOCA = [
        {id:'g1', name:"Grup 1: Establiments minoristes de restauració"},
        {id:'g2', name:"Grup 2: Establiments minoristes d'alimentació amb elaboració"},
        {id:'g3', name:"Grup 3. Establiments minoristes SENSE elaboració"}
    ]

    _datetime: Moment;

    InputformService: IndretCreateFormService | IndretPartialUpdateFormService;

    @Input()
    isEdit: boolean;

    @Input()
    errors;

    constructor(
        private _matSnackBar: MatSnackBar,
        private _indretListFormService: IndretListFormService,
        private _createIndretFS: IndretCreateFormService,
        private _partialUpdateIndretFS: IndretPartialUpdateFormService,
        private _generalMasterTablesListFormService: GeneralMasterTablesListFormService,
        private showService:IndretControlsService,
        
    ) {
        this._datetime = moment(now());
    }


    ngOnInit() {
        if(!this.isEdit){
            this.InputformService = this._createIndretFS;
            this.InputformService.form.get('data.registration_date').setValue(this._datetime.format('YYYY-MM-DD'));
        } else {
            this.InputformService = this._partialUpdateIndretFS;
        }
    }

    autocompleteCategory(event){
        let ids = "";
        this.InputformService.form.get('data.types').value.forEach((value,i,arr) => {
            ids+=value;
            if(arr.length -1 != i){
                ids+=","
            }
        });
        if(ids != ""){
            this._generalMasterTablesListFormService.submit(
                {
                    id_filter:ids,
                    type:'indret_type',
                    fields:'parent_table'
                }
            ).pipe(
                map(result=>_.map(result.results.filter(x=>x.parent_table.length>0),value => value.parent_table)),
                tap((values) => {console.log(values);this.InputformService.form.get('data.categories').patchValue(values)})
            ).subscribe();
        } else {
            this.InputformService.form.get('data.categories').patchValue([])
        }
    }


    getIndretAddress(): void {
        let params = {
            type_of_road_name:this.InputformService.form.value.data.type_of_road_name,
            street_name:this.InputformService.form.value.data.street_name,
            start_number_name:this.InputformService.form.value.data.start_number_name,
            neighborhood_name:this.InputformService.form.value.data.neighborhood_name,
            district_name:this.InputformService.form.value.data.district_name,
        }
        if(
            this.InputformService.form.value.data.type_of_road_name && 
            this.InputformService.form.value.data.street_name && 
            this.InputformService.form.value.data.start_number_name &&
            this.InputformService.form.value.data.neighborhood_name &&
            this.InputformService.form.value.data.district_name
            ){
                this._indretListFormService.submit(params)
                    .subscribe(result=>{
                        this.hasAddressIndret = result.results.length;
                        this.addressIndret = result.results;
                    });
            }
    }

    getErrorsAddress(){
        return this.errors?.street_name || this.errors?.start_number_name || this.errors?.type_of_road_name || this.errors?.district_name || this.errors?.neighborhood_name 
    }

    clearAddress(){
        this.InputformService.form.get('data').patchValue({
            type_of_road_id: null,
            type_of_road_name: null,
            street_id: null,
            street_name: null,
            start_number_id: null,
            start_number_name: null,
            zip_code: null,
            neighborhood_id: null,
            neighborhood_name: null,
            district_id: null,
            district_name: null,
        });
    }
}
