/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {  Observable } from 'rxjs';
import { IndretCircuitService } from '../../../controllers/IndretCircuit';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGPostFormService } from '../../yasag-post.service';


@Injectable()
export class IndretCircuitPartialUpdateFormService extends YASAGPostFormService<__model.IndretCircuit> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: IndretCircuitService,
  ) {
    super('IndretCircuitPartialUpdate', apiConfigService, ngZone);
    this.form = new FormGroup({
      data: new FormGroup({
        id: new FormControl({value: undefined, disabled: false}, []),
        sample_points: new FormArray([], []),
        canteen: new FormGroup({
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
        }, []),
        is_active: new FormControl({value: undefined, disabled: false}, []),
        is_canteen: new FormControl({value: undefined, disabled: false}, []),
        name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        registration_date: new FormControl({value: undefined, disabled: false}, []),
        termination_date: new FormControl({value: undefined, disabled: false}, []),
        indret: new FormControl({value: undefined, disabled: false}, []),
        type: new FormControl({value: undefined, disabled: false}, []),
        tech_responsible: new FormControl({value: undefined, disabled: false}, []),
      }, [Validators.required]),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
      id: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    });
    this.init()
  }

  public addDataSamplePoints( sample_points: number = 1, position?: number, value?: any): void {
    const control = <FormArray>this.form['controls']['data']['controls']['sample_points'];
    const fg = new FormGroup({
      id: new FormControl({value: undefined, disabled: false}, []),
      name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
      is_active: new FormControl({value: undefined, disabled: false}, []),
      indret_circuit: new FormControl({value: undefined, disabled: false}, []),
    }, []);
    __utils.addField(control,sample_points, fg, position, value);
  }

  public removeDataSamplePoints( i: number): void {
    const control = <FormArray>this.form['controls']['data']['controls']['sample_points'];
    control.removeAt(i);
  }

  submit(value: any = false): Observable<__model.IndretCircuit> {
    const result = val => this.service.partialUpdate(val);
    return this._submit('__model.IndretCircuit', result, 'data', value, true );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.IndretCircuit> {
    if (submit) {
      this.submit(value);
    }
    return this._listen(value, submit);
  }


  reset(value?: any): void {
    this.form.reset();
    while ((<FormArray>this.form['controls']['data']['controls']['sample_points']).length) {
      this.removeDataSamplePoints(0);
    }
    if (value && value['data'] && value['data']['sample_points']) {
      this.addDataSamplePoints(value['data']['sample_points'].length);
    }
    super.reset(value, true); 
  }
  patch(value: any): void {
    if (value && value['data'] && value['data']['sample_points']) {
      while (this.form.value['data']['sample_points'].length > 0) {
        this.removeDataSamplePoints(0);
      }
      if (value['data']['sample_points'].length > this.form.value['data']['sample_points'].length) {
        this.addDataSamplePoints(value['data']['sample_points'].length - this.form.value['data']['sample_points'].length);
      }
    }
    this.form.patchValue(value);
  }
}
