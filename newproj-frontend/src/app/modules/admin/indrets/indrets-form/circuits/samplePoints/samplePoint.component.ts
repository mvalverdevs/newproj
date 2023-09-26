import {Component, EventEmitter, Input, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {IndretSamplePointCreateFormService, IndretSamplePointPartialUpdateFormService } from 'api/form-service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SipsForm } from 'app/utils/sipsForm.class';
import { Subject,} from 'rxjs';
import { SamplePoint } from 'api/model';


@Component({
    selector: 'app-indrets-samplePoints',
    templateUrl: './samplePoint.component.html',
    styleUrls: ['./samplePoint.component.scss']
})
export class SamplePointsComponent {

    isEdit: boolean;

    @Input()
    errors = [];

    @Input()
    circuit_id: number;

    @Input()
    InputformService;
    
    @Input()
    isNew: boolean;

    breakpoint = 2;
    
    samplePointsFormArray : FormArray;
    samplePointsForm : FormGroup;

    protected unsubscribe$: Subject<void>;

    constructor(
    ) {
        this.samplePointsForm = new FormGroup({
            id: new FormControl({value: undefined, disabled: false}, []),
            name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
            is_active: new FormControl({value: undefined, disabled: false}, []),
            indret_circuit: new FormControl({value: undefined, disabled: false}, []),
          }, [Validators.required]);
    }


    ngOnInit() {
        // this.formService.patch({data:{indret_circuit:this.circuit_id,is_active:false}});
        this.breakpoint = (window.innerWidth <= 900) ? 1 : 2;
        
    }

    onResize(event) {
        this.breakpoint = (event.target.innerWidth <= 900) ? 1 : 2;
      }

    addSamplePoint(){
        this.InputformService.addDataCircuitsSamplePoints(this.circuit_id,1,undefined,this.samplePointsForm.value);
    }

    public removeSamplePoint( i: number): void {
        this.InputformService.removeDataCircuitsSamplePoints(this.circuit_id,i);
    }
    
}
