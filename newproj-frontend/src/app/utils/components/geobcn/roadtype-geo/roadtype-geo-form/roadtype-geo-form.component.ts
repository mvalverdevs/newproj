import {
  Component, Input,
  OnInit,
} from '@angular/core';

import {FormGroup} from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-roadtype-geo-form',
  templateUrl: './roadtype-geo-form.component.html',
  styleUrls: ['./roadtype-geo-form.component.scss']
})
export class RoadtypeGeoFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() field: string;

  @Input() multiple: boolean;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() serverErrors: any;
  @Input() matMinLength: number;

  model: any;

  fields: any[];

  constructor(
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  get errors(): void{
    if (this.serverErrors){
      return this.getDescendantProp(this.serverErrors, this.field.replace('data.', '') + '_' + this.fields[1].nfge);
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

      this.form.valueChanges.pipe().subscribe(value => {
        setTimeout(() => {
          this.model = {};
          for (const i in this.fields){
            if (this.form.get(this.field + '_' + this.fields[i].nfge)){
              this.model[this.fields[i].bcn] = this.form.get(this.field + '_' + this.fields[i].nfge).value;
            }
          }
        });
      });
    

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  setValue(): void{
    for (const i in this.fields){
      if (this.form.get(this.field + '_' + this.fields[i].nfge)){
        this.form.get(this.field + '_' + this.fields[i].nfge).patchValue(this.model[this.fields[i].bcn] || null);
      }
    }
  }

}
