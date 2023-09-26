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
export class UserResetPasswordFormService extends YASAGPostFormService<__model.Email> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: UserService,
  ) {
    super('UserResetPassword', apiConfigService, ngZone);
    this.form = new FormGroup({
      data: new FormGroup({
        email: new FormControl({value: undefined, disabled: false}, [Validators.email, Validators.minLength(1), Validators.required]),
      }, [Validators.required]),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
    });
    this.init()
  }

  submit(value: any = false): Observable<__model.Email> {
    const result = val => this.service.resetPassword(val);
    return this._submit('__model.Email', result, 'null', value, false );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.Email> {
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
