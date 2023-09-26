/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {  Observable } from 'rxjs';
import { IndretTitularService } from '../../../controllers/IndretTitular';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGGetFormService } from '../../yasag-get.service';


@Injectable()
export class IndretTitularListFormService extends YASAGGetFormService<__model.IndretTitularList> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: IndretTitularService,
  ) {
    super('IndretTitularList', apiConfigService, ngZone);
    this.form = new FormGroup({
      search: new FormControl({value: undefined, disabled: false}, []),
      identification__iexact: new FormControl({value: undefined, disabled: false}, []),
      identification__icontains: new FormControl({value: undefined, disabled: false}, []),
      CIF__iexact: new FormControl({value: undefined, disabled: false}, []),
      CIF__icontains: new FormControl({value: undefined, disabled: false}, []),
      social_reason__iexact: new FormControl({value: undefined, disabled: false}, []),
      social_reason__icontains: new FormControl({value: undefined, disabled: false}, []),
      full_name_filter: new FormControl({value: undefined, disabled: false}, []),
      limit: new FormControl({value: undefined, disabled: false}, []),
      offset: new FormControl({value: undefined, disabled: false}, []),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
    });
    this.init()
  }

  submit(value: any = false, cache = true, only_cache = false): Observable<__model.IndretTitularList> {
    const result = val => this.service.list(val);
    return this._submit('__model.IndretTitularList', result, value, cache, only_cache );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.IndretTitularList> {
    if (submit) {
      this.submit(value);
    }
    return this._listen('__model.IndretTitularList', value, submit);
  }


  reset(value?: any): void {
    this.form.reset();
    super.reset(value, false); 
  }
  patch(value: any): void {
    this.form.patchValue(value);
  }
}
