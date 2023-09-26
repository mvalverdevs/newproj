import {Component, Input,} from '@angular/core';
import {Indret} from "../../../../../../api/defs/Indret";
import {MatSnackBar} from "@angular/material/snack-bar";
import { GeneralMasterTablesListFormService, IndretCreateFormService, IndretPartialUpdateFormService,
} from 'api/form-service';
import {Moment, now} from 'moment';
import moment from 'moment';
import {Subject, map, takeUntil, tap} from 'rxjs';
import { GeneralMasterTables, IndretContact } from 'api/model';
import { IndretControlsService } from '../indrets.service';

@Component({
    selector: 'app-indrets-circuits',
    templateUrl: './circuits.component.html',
    styleUrls: ['./circuits.component.scss']
})
export class CircuitsComponent {

    enumTypeAirTypeStation = [{label:'Fons',value:'deep'},{label:'Trànsit',value:'traffic'},]
    enumTypeAirTypeFunctions = [{label:'Automática',value:'automatic'},{label:'Manual',value:'manual'},]
    enumTypeAirTypeLocalization = [{label:'Urbana',value:'urban'},{label:'Suburbana',value:'suburban'},]

    @Input()
    errors = {};
    
    @Input()
    isEdit: boolean;

    _datetime: Moment;
    showHabits = false;
    showWater = false;
    showTattoo = false;
    showAir = false;
    requiredTecnic = false;
    showTecnic = false;
    SCHOOL = [599,600,597];
    
    formServiceIndret: IndretCreateFormService | IndretPartialUpdateFormService ;

    
    completeTypeDict: any = {};
    checked=false;
    protected unsubscribe$: Subject<void>;
    tech_managers:IndretContact[] = [];
    type:number

    constructor(
        private _generalMasterTablesListFormService: GeneralMasterTablesListFormService,
        private _matSnackBar: MatSnackBar,
        private _indretCreateFS: IndretCreateFormService,
        private _indretPartialUpdateFS: IndretPartialUpdateFormService,
        private showService:IndretControlsService,
    ) {
        this._datetime = moment(now());
    }


    ngOnInit() {
        if(this.isEdit){
            this.formServiceIndret = this._indretPartialUpdateFS
        } else {
            this.formServiceIndret = this._indretCreateFS
        }
        this.getData();

    }

    getData(): void {

        this._generalMasterTablesListFormService.submit(
            {type: 'indret_circuit_type', limit: 1000})
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
            {type: 'indret_contact_relation', limit: 1000})
            .pipe(
                map(areas => {
                    return areas.results
                }),
                tap((areas:GeneralMasterTables[]) => {
                    this.type = areas.filter(area => area.name == 'Responsable técnico ambiental')[0].id
                    this.tech_managers = this.formServiceIndret.form.get('data.indret_contacts').value.filter(contact => contact.type=this.type);
                })            
        ).subscribe();        
    }

    ngOnChange(){
        this.getData();
    }


    addCircuit(){
        this.formServiceIndret.addDataCircuits(1,undefined,{registration_date:this._datetime.format('YYYY-MM-DD'),});
    }

    changeTipus(): void {
        this.showHabits = false;
        this.showWater = false;
        this.showAir = false;
        this.showTattoo = false;
        this.requiredTecnic = false;
        this.showTecnic = false;

        this.formServiceIndret.form.get('data.circuits').value.forEach(circuit => {
            
            if (this.completeTypeDict[circuit.type]?.name === 'Xarxa interior - AFCH') {
                this.showHabits = true;
            }
            if (this.completeTypeDict[circuit.type]?.name === 'Xarxa interior - AFCH') {
                this.showWater = true;
            }
            if (this.completeTypeDict[circuit.type]?.name === 'Aire') {
                this.showAir = true;
            }
            if (this.completeTypeDict[circuit.type]?.name === 'Tatuatges' || this.completeTypeDict[circuit.type]?.name === 'Pírcing' || this.completeTypeDict[circuit.type]?.name === 'Micropigmentació') {
                this.showTattoo = true;
            }
            if (this.completeTypeDict[circuit.type]?.name === 'ROESP - Lg' ||this.completeTypeDict[circuit.type]?.name === 'ROESP-LG' || this.completeTypeDict[circuit.type]?.name === 'ROESP - SB') {
                this.requiredTecnic = true;
            }
            if (this.completeTypeDict[circuit.type]?.name.includes('ROESP')) {
                this.showTecnic = true;
            }
        })
    }

    showCanteen(circuit_i:number): boolean {
        
        let circuit=this.formServiceIndret.form.get('data.circuits.'+circuit_i).value
        if(circuit){
            if (this.completeTypeDict[circuit.type]?.name === 'Restauració social' && this.showService.canShow('school_category_canteen',this.formServiceIndret.form.get('data.categories').value)) {
                return true;
            } else {
                return false;
            }
        }
        
    }

    showSupplyCompany(circuit_i:number): boolean {
        if(this.showCanteen(circuit_i)){

            let circuit=this.formServiceIndret.form.get('data.circuits.'+circuit_i).value
            
            if (circuit.canteen && circuit.canteen.is_supply_extern) {
                return true;
            } else {
                return false;
            } 
        } else {
            return false;
        }
    }
    showManagementCompany(circuit_i:number): boolean {
        if(this.showCanteen(circuit_i)){

            let circuit=this.formServiceIndret.form.get('data.circuits.'+circuit_i).value
    
            if (circuit.canteen && !circuit.canteen.is_internal_management) {
                return true;
            } else {
                return false;
            } 
        } else {
            return false;
        }
        
    }
    showTechnic(circuit_i:number): boolean {
        let circuit=this.formServiceIndret.form.get('data.circuits.'+circuit_i).value

        if(circuit.name == undefined && circuit.type){
            this.formServiceIndret.form.get('data.circuits.'+circuit_i).patchValue({'name':this.completeTypeDict[circuit.type]?.name});
        }

        if (this.completeTypeDict[circuit.type]?.name.includes('ROESP')) {
            return true;
        } else {
            return false;
        }
        
    }
    requiredTechnic(circuit_i:number): boolean {

        let circuit=this.formServiceIndret.form.get('data.circuits.'+circuit_i).value

        if (this.completeTypeDict[circuit.type]?.name === 'ROESP - Lg' ||this.completeTypeDict[circuit.type]?.name === 'ROESP-LG' || this.completeTypeDict[circuit.type]?.name === 'ROESP - SB') {
            return true;
        } else {
            return false;
        }
        
    }

    removeCircuit(i){
        this.formServiceIndret.removeDataCircuits(i);
        this.changeTipus()
    }
    
    getError(i:number,field:string){
        let result = [];
        if(this.errors && this.errors[i] && this.errors[i][field]){
            result = this.errors[i][field]
        }   
        return result;
    }


}
