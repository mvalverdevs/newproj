/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {  Observable } from 'rxjs';
import { IndretActionService } from '../../../controllers/IndretAction';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGPostFormService } from '../../yasag-post.service';


@Injectable()
export class IndretActionUpdateFormService extends YASAGPostFormService<__model.IndretAction> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: IndretActionService,
  ) {
    super('IndretActionUpdate', apiConfigService, ngZone);
    this.form = new FormGroup({
      data: new FormGroup({
        id: new FormControl({value: undefined, disabled: false}, []),
        indret_changes: new FormControl({value: undefined, disabled: false}, []),
        indret: new FormControl({value: undefined, disabled: false}, []),
        indret_circuits: new FormControl([], [Validators.required]),
        type_is_alimentary: new FormControl({value: undefined, disabled: false}, [Validators.required]),
        status: new FormControl({value: undefined, disabled: false}, []),
        planning_period: new FormControl({value: undefined, disabled: false}, []),
        deactivation_reason: new FormControl({value: undefined, disabled: false}, []),
        other_reasons: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        creator: new FormControl({value: undefined, disabled: false}, []),
        is_presencial: new FormControl({value: undefined, disabled: false}, [Validators.required]),
        date_scheduled: new FormControl({value: undefined, disabled: false}, [Validators.required]),
        action_date: new FormControl({value: undefined, disabled: false}, [Validators.required]),
        inspection_reason: new FormControl({value: undefined, disabled: false}, []),
        action_type: new FormControl({value: undefined, disabled: false}, []),
        rate: new FormControl({value: undefined, disabled: false}, []),
        observations: new FormControl({value: undefined, disabled: false}, []),
        technicians: new FormControl([], []),
        minute: new FormGroup({
          id: new FormControl({value: undefined, disabled: false}, []),
          source_number: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          date: new FormControl({value: undefined, disabled: false}, [Validators.required]),
          start_action_time: new FormControl({value: undefined, disabled: false}, [Validators.required]),
          end_action_time: new FormControl({value: undefined, disabled: false}, [Validators.required]),
          is_catalan: new FormControl({value: undefined, disabled: false}, []),
          action: new FormControl({value: undefined, disabled: false}, [Validators.required]),
          document: new FormControl({value: undefined, disabled: false}, []),
        }, []),
        interested: new FormGroup({
          id: new FormControl({value: undefined, disabled: false}, []),
          name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          interested_will: new FormControl({value: undefined, disabled: false}, []),
          is_present: new FormControl({value: undefined, disabled: false}, []),
          identification_type: new FormControl({value: undefined, disabled: false}, []),
          identification: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
          action: new FormControl({value: undefined, disabled: false}, [Validators.required]),
          in_capacity_of: new FormControl({value: undefined, disabled: false}, []),
        }, []),
        documents: new FormArray([], [Validators.required]),
        products: new FormArray([], [Validators.required]),
      }, [Validators.required]),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
      id: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    });
    this.init()
  }

  public addDataDocuments( documents: number = 1, position?: number, value?: any): void {
    const control = <FormArray>this.form['controls']['data']['controls']['documents'];
    const fg = new FormGroup({
      type: new FormControl({value: undefined, disabled: false}, [Validators.required]),
      other_type_text: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
      document: new FormControl({value: undefined, disabled: false}, []),
      file_name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
    }, []);
    __utils.addField(control,documents, fg, position, value);
  }

  public removeDataDocuments( i: number): void {
    const control = <FormArray>this.form['controls']['data']['controls']['documents'];
    control.removeAt(i);
  }

  public addDataProducts( products: number = 1, position?: number, value?: any): void {
    const control = <FormArray>this.form['controls']['data']['controls']['products'];
    const fg = new FormGroup({
      id: new FormControl({value: undefined, disabled: false}, []),
      product: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
      commercial_denomination: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
      brand: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
      number: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647), Validators.min(-2147483648), Validators.required]),
      is_revision_passed: new FormControl({value: undefined, disabled: false}, [Validators.required]),
      extra_info: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
      indret: new FormControl({value: undefined, disabled: false}, [Validators.required]),
      product_type: new FormControl({value: undefined, disabled: false}, []),
    }, []);
    __utils.addField(control,products, fg, position, value);
  }

  public removeDataProducts( i: number): void {
    const control = <FormArray>this.form['controls']['data']['controls']['products'];
    control.removeAt(i);
  }

  submit(value: any = false): Observable<__model.IndretAction> {
    const result = val => this.service.update(val);
    return this._submit('__model.IndretAction', result, 'null', value, false );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.IndretAction> {
    if (submit) {
      this.submit(value);
    }
    return this._listen(value, submit);
  }


  reset(value?: any): void {
    this.form.reset();
    while ((<FormArray>this.form['controls']['data']['controls']['documents']).length) {
      this.removeDataDocuments(0);
    }
    if (value && value['data'] && value['data']['documents']) {
      this.addDataDocuments(value['data']['documents'].length);
    }
    while ((<FormArray>this.form['controls']['data']['controls']['products']).length) {
      this.removeDataProducts(0);
    }
    if (value && value['data'] && value['data']['products']) {
      this.addDataProducts(value['data']['products'].length);
    }
    super.reset(value, false); 
  }
  patch(value: any): void {
    if (value && value['data'] && value['data']['documents']) {
      while (this.form.value['data']['documents'].length > 0) {
        this.removeDataDocuments(0);
      }
      if (value['data']['documents'].length > this.form.value['data']['documents'].length) {
        this.addDataDocuments(value['data']['documents'].length - this.form.value['data']['documents'].length);
      }
    }
    if (value && value['data'] && value['data']['products']) {
      while (this.form.value['data']['products'].length > 0) {
        this.removeDataProducts(0);
      }
      if (value['data']['products'].length > this.form.value['data']['products'].length) {
        this.addDataProducts(value['data']['products'].length - this.form.value['data']['products'].length);
      }
    }
    this.form.patchValue(value);
  }
}
