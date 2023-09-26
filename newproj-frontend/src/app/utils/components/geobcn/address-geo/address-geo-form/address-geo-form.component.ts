import {
  ChangeDetectorRef,
    Component, EventEmitter, Input,
    OnDestroy,
    OnInit, Output,
} from '@angular/core';

import {FormGroup} from '@angular/forms';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-address-geo-form',
  templateUrl: './address-geo-form.component.html',
  styleUrls: ['./address-geo-form.component.scss']
})
export class AddressGeoFormComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  @Input() form: FormGroup;
  @Input() field: string;

  @Input() multiple: boolean;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() serverErrors: any;
  @Input() matMinLength: number;
  @Input() road: string;
  @Input() copyField: string;

  @Output() emit: EventEmitter<any> = new EventEmitter();
  model: any;

  fields = [
    {nfge: 'id', bcn: 'id'},
    {nfge: 'name', bcn: 'numeracioPostal'},
    {nfge: 'data.neighborhood_id', bcn: 'barri.codi', external: true},
    {nfge: 'data.neighborhood_name', bcn: 'barri.nom', external: true},
    {nfge: 'data.district_id', bcn: 'districte.codi', external: true},
    {nfge: 'data.district_name', bcn: 'districte.descripcio', external: true},
    {nfge: 'data.zip_code', bcn: 'zip_code', external: true},
    {nfge: 'data.titularity.zip_code', bcn: 'zip_code', external: true},
    {nfge: 'data.coordinates', bcn: 'coordinates', external: true}
  ];
  roadValue: any;

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

    this.form.valueChanges.pipe(first(), takeUntil(this.unsubscribe$)).subscribe(value => {
      setTimeout(() => {
        this.model = {};
        for (const i in this.fields) {
          if (this.form.get(this.field + '_' + this.fields[i].nfge)) {
            this.model[this.fields[i].bcn] = this.form.get(this.field + '_' + this.fields[i].nfge).value;
          }
        }
      });
    });

    // Clean when road changes
    this.form.get(this.road).valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(value => {
      setTimeout(() => {
        if (!this.roadValue){
          this.roadValue = this.form.get(this.road).value;
        }
        if (this.roadValue !== this.form.get(this.road).value){
          this.roadValue = this.form.get(this.road).value;
          this.model = {};
          this.setValue(true);
        }
      });
    });
    this.form.get(this.field + '_' + this.fields[0].nfge).valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(value => {
      setTimeout(() => {
        this.model = {};
        for (const i in this.fields) {
          if (this.form.get(this.field + '_' + this.fields[i].nfge)) {
            this.model[this.fields[i].bcn] = this.form.get(this.field + '_' + this.fields[i].nfge).value;
          }
        }
      });
    });

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  setValue(onlyInternal?: boolean): void{
    for (const i in this.fields){
      if (this.fields[i].external && !onlyInternal){
        if (this.form.get(this.fields[i].nfge)) {
          this.form.get(this.fields[i].nfge).patchValue(this.getDescendantProp(this.model, this.fields[i].bcn) || null);
        }
      }else{
        if (this.form.get(this.field + '_' + this.fields[i].nfge)){
          this.form.get(this.field + '_' + this.fields[i].nfge).patchValue(this.getDescendantProp(this.model, this.fields[i].bcn) || null);
        }
      }
    }

    if(this.copyField){
      for (const i in this.fields){
        if (!this.fields[i].external){
          if (this.form.get(this.copyField + '_' + this.fields[i].nfge)){
            this.form.get(this.copyField + '_' + this.fields[i].nfge).patchValue(this.getDescendantProp(this.model, this.fields[i].bcn) || null);
          }
        }
      }
    }

    this.emit.emit(true);
  }

}
