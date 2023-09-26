/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {  Observable } from 'rxjs';
import { UserService } from '../../../controllers/User';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGPostFormService } from '../../yasag-post.service';


@Injectable()
export class UserPartialUpdateFormService extends YASAGPostFormService<__model.User> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: UserService,
  ) {
    super('UserPartialUpdate', apiConfigService, ngZone);
    this.form = new FormGroup({
      data: new FormGroup({
        id: new FormControl({value: undefined, disabled: false}, []),
        email: new FormControl({value: undefined, disabled: false}, [Validators.email, Validators.maxLength(254), Validators.minLength(1), Validators.required]),
        first_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(30), Validators.minLength(1)]),
        last_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(150), Validators.minLength(1)]),
        roles: new FormControl([], [Validators.required]),
        phone: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(16), Validators.minLength(1)]),
        mobile_phone: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(16), Validators.minLength(1)]),
        department: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(32), Validators.minLength(1)]),
        reference_in: new FormControl([], []),
        charge: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(64), Validators.minLength(1)]),
        registration_number: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(64), Validators.minLength(1)]),
        is_inspector: new FormControl({value: undefined, disabled: false}, []),
        is_active: new FormControl({value: undefined, disabled: false}, []),
        weekly_inspections: new FormControl({value: undefined, disabled: false}, [Validators.max(2147483647)]),
        company_name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(128), Validators.minLength(1)]),
      }, [Validators.required]),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
      id: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    });
    this.init()
  }

  submit(value: any = false): Observable<__model.User> {
    const result = val => this.service.partialUpdate(val);
    return this._submit('__model.User', result, 'data', value, true );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.User> {
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
