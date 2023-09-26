/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {  Observable } from 'rxjs';
import { IndretCompanyService } from '../../../controllers/IndretCompany';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGPostFormService } from '../../yasag-post.service';


@Injectable()
export class IndretCompanyPartialUpdateFormService extends YASAGPostFormService<__model.IndretCompany> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: IndretCompanyService,
  ) {
    super('IndretCompanyPartialUpdate', apiConfigService, ngZone);
    this.form = new FormGroup({
      data: new FormGroup({
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
      }, [Validators.required]),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
      id: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    });
    this.init()
  }

  submit(value: any = false): Observable<__model.IndretCompany> {
    const result = val => this.service.partialUpdate(val);
    return this._submit('__model.IndretCompany', result, 'data', value, true );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.IndretCompany> {
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
