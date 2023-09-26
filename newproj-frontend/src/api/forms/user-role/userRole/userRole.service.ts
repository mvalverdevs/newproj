/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {  Observable } from 'rxjs';
import { UserRoleService } from '../../../controllers/UserRole';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGGetFormService } from '../../yasag-get.service';


@Injectable()
export class UserRoleUserRoleFormService extends YASAGGetFormService<__model.UserRoleUserRole> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: UserRoleService,
  ) {
    super('UserRoleUserRole', apiConfigService, ngZone);
    this.form = new FormGroup({
      search: new FormControl({value: undefined, disabled: false}, []),
      limit: new FormControl({value: undefined, disabled: false}, []),
      offset: new FormControl({value: undefined, disabled: false}, []),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
    });
    this.init()
  }

  submit(value: any = false, cache = true, only_cache = false): Observable<__model.UserRoleUserRole> {
    const result = val => this.service.userRole(val);
    return this._submit('__model.UserRoleUserRole', result, value, cache, only_cache );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.UserRoleUserRole> {
    if (submit) {
      this.submit(value);
    }
    return this._listen('__model.UserRoleUserRole', value, submit);
  }


  reset(value?: any): void {
    this.form.reset();
    super.reset(value, false); 
  }
  patch(value: any): void {
    this.form.patchValue(value);
  }
}
