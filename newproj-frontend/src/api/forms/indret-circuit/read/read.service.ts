/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {  Observable } from 'rxjs';
import { IndretCircuitService } from '../../../controllers/IndretCircuit';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGGetFormService } from '../../yasag-get.service';


@Injectable()
export class IndretCircuitReadFormService extends YASAGGetFormService<__model.IndretCircuit> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: IndretCircuitService,
  ) {
    super('IndretCircuitRead', apiConfigService, ngZone);
    this.form = new FormGroup({
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
      id: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    });
    this.init()
  }

  submit(value: any = false, cache = true, only_cache = false): Observable<__model.IndretCircuit> {
    const result = val => this.service.read(val);
    return this._submit('__model.IndretCircuit', result, value, cache, only_cache );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.IndretCircuit> {
    if (submit) {
      this.submit(value);
    }
    return this._listen('__model.IndretCircuit', value, submit);
  }


  reset(value?: any): void {
    this.form.reset();
    super.reset(value, false); 
  }
  patch(value: any): void {
    this.form.patchValue(value);
  }
}
