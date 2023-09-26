/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {  Observable } from 'rxjs';
import { UserService } from '../../../controllers/User';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGGetFormService } from '../../yasag-get.service';


@Injectable()
export class UserListFormService extends YASAGGetFormService<__model.UserList> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: UserService,
  ) {
    super('UserList', apiConfigService, ngZone);
    this.form = new FormGroup({
      username: new FormControl({value: undefined, disabled: false}, []),
      first_name: new FormControl({value: undefined, disabled: false}, []),
      last_name: new FormControl({value: undefined, disabled: false}, []),
      email: new FormControl({value: undefined, disabled: false}, []),
      phone: new FormControl({value: undefined, disabled: false}, []),
      is_active: new FormControl({value: undefined, disabled: false}, []),
      roles: new FormControl({value: undefined, disabled: false}, []),
      reference_in: new FormControl({value: undefined, disabled: false}, []),
      search: new FormControl({value: undefined, disabled: false}, []),
      ordering: new FormControl({value: undefined, disabled: false}, []),
      limit: new FormControl({value: undefined, disabled: false}, []),
      offset: new FormControl({value: undefined, disabled: false}, []),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
    });
    this.init()
  }

  submit(value: any = false, cache = true, only_cache = false): Observable<__model.UserList> {
    const result = val => this.service.list(val);
    return this._submit('__model.UserList', result, value, cache, only_cache );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.UserList> {
    if (submit) {
      this.submit(value);
    }
    return this._listen('__model.UserList', value, submit);
  }


  reset(value?: any): void {
    this.form.reset();
    super.reset(value, false); 
  }
  patch(value: any): void {
    this.form.patchValue(value);
  }
}
