/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {  Observable } from 'rxjs';
import { IndretCircuitService } from '../../../controllers/IndretCircuit';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGGetFormService } from '../../yasag-get.service';


@Injectable()
export class IndretCircuitListFormService extends YASAGGetFormService<__model.IndretCircuitList> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: IndretCircuitService,
  ) {
    super('IndretCircuitList', apiConfigService, ngZone);
    this.form = new FormGroup({
      search: new FormControl({value: undefined, disabled: false}, []),
      indret: new FormControl({value: undefined, disabled: false}, []),
      is_active: new FormControl({value: undefined, disabled: false}, []),
      limit: new FormControl({value: undefined, disabled: false}, []),
      offset: new FormControl({value: undefined, disabled: false}, []),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
    });
    this.init()
  }

  submit(value: any = false, cache = true, only_cache = false): Observable<__model.IndretCircuitList> {
    const result = val => this.service.list(val);
    return this._submit('__model.IndretCircuitList', result, value, cache, only_cache );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.IndretCircuitList> {
    if (submit) {
      this.submit(value);
    }
    return this._listen('__model.IndretCircuitList', value, submit);
  }


  reset(value?: any): void {
    this.form.reset();
    super.reset(value, false); 
  }
  patch(value: any): void {
    this.form.patchValue(value);
  }
}
