/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {  Observable } from 'rxjs';
import { IndretTitularService } from '../../../controllers/IndretTitular';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGPostFormService } from '../../yasag-post.service';


@Injectable()
export class IndretTitularPartialUpdateFormService extends YASAGPostFormService<__model.IndretTitular> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: IndretTitularService,
  ) {
    super('IndretTitularPartialUpdate', apiConfigService, ngZone);
    this.form = new FormGroup({
      data: new FormGroup({
        id: new FormControl({value: undefined, disabled: false}, []),
        is_legal_entity: new FormControl({value: undefined, disabled: false}, [Validators.required]),
        identification: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        first_name: new FormControl({value: undefined, disabled: false}, []),
        last_name: new FormControl({value: undefined, disabled: false}, []),
        second_last_name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        identification_type: new FormControl({value: undefined, disabled: false}, []),
        social_reason: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        CIF: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        registration_date: new FormControl({value: undefined, disabled: false}, []),
        primary_phone: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(128), Validators.minLength(1), Validators.required]),
        secondary_phone: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(128), Validators.minLength(1)]),
        emails: new FormControl([], []),
        is_public: new FormControl({value: undefined, disabled: false}, []),
        tax_exempt: new FormControl({value: undefined, disabled: false}, []),
        group: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(255), Validators.minLength(1)]),
        type_of_road_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32)]),
        type_of_road_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1), Validators.required]),
        street_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
        street_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(255), Validators.minLength(1), Validators.required]),
        start_number_id: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
        start_number_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1), Validators.required]),
        zip_code: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(6), Validators.minLength(1)]),
        population: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(40), Validators.minLength(1), Validators.required]),
        province: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(40), Validators.minLength(1), Validators.required]),
      }, [Validators.required]),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
      id: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    });
    this.init()
  }

  submit(value: any = false): Observable<__model.IndretTitular> {
    const result = val => this.service.partialUpdate(val);
    return this._submit('__model.IndretTitular', result, 'data', value, true );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.IndretTitular> {
    if (submit) {
      this.submit(value);
    }
    return this._listen(value, submit);
  }


  reset(value?: any): void {
    this.form.reset();
    super.reset(value, true); 
  }
  patch(value: any): void {
    this.form.patchValue(value);
  }
}
