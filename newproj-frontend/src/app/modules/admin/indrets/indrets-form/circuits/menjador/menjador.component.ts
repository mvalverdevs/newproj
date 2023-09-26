import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-indrets-menjador',
    templateUrl: './menjador.component.html',
    styleUrls: ['./menjador.component.scss'],
})
export class MenjadorComponent {
    menjadorForm: FormGroup;
    baby_selected = false;
    enumTypeSupplyCanteen = [
        { label: 'Linea freda', value: 'cold_line' },
        { label: 'Calenta', value: 'warm_up' },
        { label: 'Congelació', value: 'frozen' },
    ];
    enumTypeSupplyCanteenCompany = [
        { label: 'Cuina Central', value: 'central_kitchen' },
        { label: 'Restaurant Comercial', value: 'commercial_restaurant' },
        {
            label: 'Establiment de restauració social',
            value: 'social_restoration',
        },
        { label: 'Pasar a subtitule', value: 'subtitle' },
        { label: 'Empresa suministradora', value: 'supply_company' },
    ];
    enumTypeOtherSupplyCanteenCompany = [
        { label: 'Mateixa titularitat', value: 'same_ownership' },
        { label: 'Marginalitat', value: 'marginality' },
        { label: 'Amb RSIPAC', value: 'with_rsipac' },
    ];
    enumWeekday = [
        { label: 'Dilluns', value: 'lun' },
        { label: 'Dimarts', value: 'mar' },
        { label: 'Dimecres', value: 'mie' },
        { label: 'Dijous', value: 'jue' },
        { label: 'Divendres', value: 'vie' },
        { label: 'Dissabte', value: 'sab' },
        { label: 'Diumenge', value: 'dom' },
    ];
    agesChoices = [
        { label: '0 a 3', value: '0-3' },
        { label: '4 a 6', value: '4-6' },
        { label: '7 a 9', value: '7-9' },
        { label: '9 a 12', value: '9-12' },
    ];

    @Input()
    circuit_id: number;

    @Input()
    errors;

    @Input()
    InputformService;

    protected unsubscribe$: Subject<void>;

    constructor() {}

    ngOnInit() {}

    getError(i:number,field:string){
        let result = [];
        if(this.errors && this.errors[i] && this.errors[i][field]){
            result = this.errors[i][field]
        }   
        return result;
    }

}
