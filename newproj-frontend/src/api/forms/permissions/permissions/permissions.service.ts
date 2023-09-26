/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {  Observable } from 'rxjs';
import { PermissionsService } from '../../../controllers/Permissions';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGGetFormService } from '../../yasag-get.service';


@Injectable()
export class PermissionsPermissionsFormService extends YASAGGetFormService<__model.Permission> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: PermissionsService,
  ) {
    super('PermissionsPermissions', apiConfigService, ngZone);
    this.form = new FormGroup({
      search: new FormControl({value: undefined, disabled: false}, []),
      limit: new FormControl({value: undefined, disabled: false}, []),
      offset: new FormControl({value: undefined, disabled: false}, []),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
    });
    this.init()
  }

  submit(value: any = false, cache = true, only_cache = false): Observable<__model.Permission> {
    const result = val => this.service.permissions(val);
    return this._submit('__model.Permission', result, value, cache, only_cache );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.Permission> {
    if (submit) {
      this.submit(value);
    }
    return this._listen('__model.Permission', value, submit);
  }


  reset(value?: any): void {
    this.form.reset();
    super.reset(value, false); 
  }
  patch(value: any): void {
    this.form.patchValue(value);
  }
}
