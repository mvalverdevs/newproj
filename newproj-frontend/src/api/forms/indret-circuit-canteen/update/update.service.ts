/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {  Observable } from 'rxjs';
import { IndretCircuitCanteenService } from '../../../controllers/IndretCircuitCanteen';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGPostFormService } from '../../yasag-post.service';


@Injectable()
export class IndretCircuitCanteenUpdateFormService extends YASAGPostFormService<__model.IndretCircuitCanteen> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: IndretCircuitCanteenService,
  ) {
    super('IndretCircuitCanteenUpdate', apiConfigService, ngZone);
    this.form = new FormGroup({
      data: new FormGroup({
        id: new FormControl({value: undefined, disabled: false}, []),
        management_company: new FormGroup({
          id: new FormControl({value: undefined, disabled: false}, []),
          name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
          identification: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          phone: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(128), Validators.minLength(1)]),
          email: new FormControl({value: undefined, disabled: false}, [Validators.email, Validators.maxLength(254), Validators.minLength(1)]),
          contact_person: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          address: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          rsipac: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          rgs: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          registered_office: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          observations: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          type_of_road_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          type_of_road_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          street_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          street_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(255), Validators.minLength(1)]),
          start_number_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          start_number_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          zip_code: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(6), Validators.minLength(1)]),
          population: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(40), Validators.minLength(1)]),
          province: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(40), Validators.minLength(1)]),
        }, []),
        supply_company: new FormGroup({
          id: new FormControl({value: undefined, disabled: false}, []),
          name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
          identification: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          phone: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(128), Validators.minLength(1)]),
          email: new FormControl({value: undefined, disabled: false}, [Validators.email, Validators.maxLength(254), Validators.minLength(1)]),
          contact_person: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          address: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          rsipac: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          rgs: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          registered_office: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          observations: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          type_of_road_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          type_of_road_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          street_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          street_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(255), Validators.minLength(1)]),
          start_number_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          start_number_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
          zip_code: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(6), Validators.minLength(1)]),
          population: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(40), Validators.minLength(1)]),
          province: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(40), Validators.minLength(1)]),
        }, []),
        ages: new FormControl([], []),
        feeding_bottle_childs: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647)]),
        menu_per_turn: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647)]),
        reception_hours: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        has_donations: new FormControl({value: undefined, disabled: false}, []),
        is_attached_to_project: new FormControl({value: undefined, disabled: false}, []),
        project_name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        is_supply_intern: new FormControl({value: undefined, disabled: false}, []),
        is_supply_extern: new FormControl({value: undefined, disabled: false}, []),
        type_supply_company: new FormControl({value: undefined, disabled: false}, []),
        type_supply: new FormControl({value: undefined, disabled: false}, []),
        is_internal_management: new FormControl({value: undefined, disabled: false}, []),
        supplies_others: new FormControl({value: undefined, disabled: false}, []),
        other_supply_companies: new FormControl({value: undefined, disabled: false}, []),
        number_lunch_menus: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647), Validators.min(-2147483648)]),
        number_diner_menus: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647), Validators.min(-2147483648)]),
        week_days: new FormControl([], []),
      }, [Validators.required]),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
      id: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    });
    this.init()
  }

  submit(value: any = false): Observable<__model.IndretCircuitCanteen> {
    const result = val => this.service.update(val);
    return this._submit('__model.IndretCircuitCanteen', result, 'null', value, false );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.IndretCircuitCanteen> {
    if (submit) {
      this.submit(value);
    }
    return this._listen(value, submit);
  }


  reset(value?: any): void {
    this.form.reset();
    super.reset(value, false); 
  }
  patch(value: any): void {
    this.form.patchValue(value);
  }
}
