import {
  AfterViewInit,
  Component, EventEmitter, Input,
  OnInit, Output,
} from '@angular/core';

import {FormGroup} from '@angular/forms';
import {Neighborhood} from '../../../../../../apigeo/defs/Neighborhood';
import {fromEvent, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, first, takeUntil, tap} from 'rxjs/operators';
@Component({
  selector: 'app-neighborhood-geo-form',
  templateUrl: './neighborhood-geo-form.component.html',
  styleUrls: ['./neighborhood-geo-form.component.scss']
})
export class NeighborhoodGeoFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() field: string;

  @Input() multiple: boolean;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() serverErrors: any;
  @Input() matMinLength: number;
  @Input() district: string;
  @Input() paramsAddEvent: any;

  model: any;

  fields: any[];

  @Output()
  change = new EventEmitter<any>();

  @Output()
  multipleAddEvent = new EventEmitter<any>();

  districtValue: any;

  constructor(
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  get errors(): void{
    if (this.serverErrors){
      return this.getDescendantProp(this.serverErrors, this.field.replace('data.', '') + '_' + this.fields[0].nfge);
    }
    return null;
  }

  getDescendantProp(obj, desc): any {
    const arr = desc.split('.');
    while (arr.length && (obj = obj[arr.shift()])){}
    return obj;
  }

  ngOnInit(): void {
    this.fields = [
      {nfge: 'id', bcn: 'codi'},
      {nfge: 'name', bcn: 'nom'},
    ];

    this.form.valueChanges.subscribe(value => {
      setTimeout(() => {
        if (this.multiple){
          let modelmultiple = [];
          this.model = [];
          const arr = this.field.split('.__index__.');
          const f = arr[0];
          if (this.form.get(f)) {
            modelmultiple = this.form.get(f).value;
          }

          for (const j in modelmultiple){
            this.model.push({});
            for (const i in this.fields) {
              this.model[j][this.fields[i].bcn] = modelmultiple[j][arr[1] + '_' + this.fields[i].nfge];
            }
          }
        }else{
          this.model = {};
          for (const i in this.fields) {
            if (this.form.get(this.field + '_' + this.fields[i].nfge)) {
              this.model[this.fields[i].bcn] = this.form.get(this.field + '_' + this.fields[i].nfge).value;
            }
          }
        }
      });
    });

    // Clean when it changes
    if (this.district) {
      this.form.get(this.district).valueChanges.subscribe(value => {
        setTimeout(() => {
          if (!this.districtValue) {
            this.districtValue = this.form.get(this.district).value;
          }
          if (this.districtValue !== this.form.get(this.district).value) {
            this.districtValue = this.form.get(this.district).value;
            if (this.multiple) {
              this.model = [];
            }else{
              this.model = {};
            }
            this.setValue();
          }
        });
      });
    }

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  setValue(): void{
    const emit = {params: this.paramsAddEvent, model: this.model};
    this.multipleAddEvent.emit(emit);
    if (this.multiple){
      for (const i in this.fields){
        for (const j in this.model){
          let f = this.field + '_' + this.fields[i].nfge;
          f = f.replace('__index__', j);
          if (this.form.get(f)){
            this.form.get(f).patchValue(this.model[j][this.fields[i].bcn] || null);
          }
        }
      }
    }else{
      for (const i in this.fields){
        if (this.form.get(this.field + '_' + this.fields[i].nfge)){
          this.form.get(this.field + '_' + this.fields[i].nfge).patchValue(this.model[this.fields[i].bcn] || null);
        }
      }
    }
    this.change.emit(this.model);
  }

}
