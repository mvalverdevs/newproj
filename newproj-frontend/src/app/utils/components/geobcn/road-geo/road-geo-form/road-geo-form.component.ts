import {
  Component, Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

import {FormGroup} from '@angular/forms';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-road-geo-form',
  templateUrl: './road-geo-form.component.html',
  styleUrls: ['./road-geo-form.component.scss']
})
export class RoadGeoFormComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  @Input() form: FormGroup;
  @Input() field: string;

  @Input() multiple: boolean;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() serverErrors: any;
  @Input() matMinLength: number;
  @Input() typeRoad: string;

  model: any;

  fields: any[];
  typeRoadValue: any;

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
      {nfge: 'type_of_road_id', bcn: 'tipusVia.codi', external: true},
      {nfge: 'type_of_road_name', bcn: 'tipusVia.nom', external: true},
      {nfge: 'titularity.type_of_road_id', bcn: 'tipusVia.codi', external: true},
      {nfge: 'titularity.type_of_road_name', bcn: 'tipusVia.nom', external: true},
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
    // Clean when typeRoad changes
    this.form.get(this.typeRoad).valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(value => {
      setTimeout(() => {
        if (!this.typeRoadValue){
          this.typeRoadValue = this.form.get(this.typeRoad).value;
        }
        if (this.typeRoadValue !== this.form.get(this.typeRoad).value){
          this.typeRoadValue = this.form.get(this.typeRoad).value;
          this.model = {};
          this.setValue();
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

  setValue(): void{
    for (const i in this.fields){
      if(!this.fields[i].external){
        if (this.form.get(this.field + '_' + this.fields[i].nfge)){
          this.form.get(this.field + '_' + this.fields[i].nfge).patchValue(this.model[this.fields[i].bcn] || null);
        }
      } else {
        if (this.form.get(this.fields[i].nfge)){
          this.form.get(this.fields[i].nfge).patchValue(this.getDescendantProp(this.model, this.fields[i].bcn) || null);
        }
      }
    }
  }

}
