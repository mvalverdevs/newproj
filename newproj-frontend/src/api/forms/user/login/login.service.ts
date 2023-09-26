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
export class UserLoginFormService extends YASAGPostFormService<__model.UserLogin> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: UserService,
  ) {
    super('UserLogin', apiConfigService, ngZone);
    this.form = new FormGroup({
      data: new FormGroup({
        username: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(150), Validators.pattern(/^[\w.@+-]+$/)]),
        password: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(128), Validators.minLength(1)]),
      }, [Validators.required]),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
    });
    this.init()
  }

  submit(value: any = false): Observable<__model.UserLogin> {
    const result = val => this.service.login(val);
    return this._submit('__model.UserLogin', result, 'null', value, false );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.UserLogin> {
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
