import {
    Component,
    Input
} from '@angular/core';
import {
    IndretCreateFormService,
    IndretPartialUpdateFormService
} from 'api/form-service';


@Component({
    selector: 'app-indrets-company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss'],
})
export class CompanyComponent {
    @Input()
    InputformService: IndretCreateFormService | IndretPartialUpdateFormService;

    @Input()
    type: string;

    @Input()
    errors: string;

    @Input()
    circuit_id: number;

    constructor() {

    }

    ngOnInit() {
        this.InputformService.form
        .get(
            'data.circuits.' +
                this.circuit_id +
                '.canteen.' +
                this.type +
                '.province'
        )
        .setValue('Barcelona');
        this.InputformService.form
            .get(
                'data.circuits.' +
                    this.circuit_id +
                    '.canteen.' +
                    this.type +
                    '.population'
            )
            .setValue('Barcelona');
    }
    
    getError(i:number,field:string){
        let result = [];
        if(this.errors && this.errors[i] && this.errors[i][field]){
            result = this.errors[i][field]
        }   
        return result;
    }
}
