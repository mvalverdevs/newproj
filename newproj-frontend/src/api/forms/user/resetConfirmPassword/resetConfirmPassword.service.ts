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
export class UserResetConfirmPasswordFormService extends YASAGPostFormService<__model.User> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: UserService,
  ) {
    super('UserResetConfirmPassword', apiConfigService, ngZone);
    this.form = new FormGroup({
      data: new FormGroup({
        token: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
        new_password1: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
        new_password2: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
      }, [Validators.required]),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
    });
    this.init()
  }

  submit(value: any = false): Observable<__model.User> {
    const result = val => this.service.resetConfirmPassword(val);
    return this._submit('__model.User', result, 'null', value, false );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.User> {
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
