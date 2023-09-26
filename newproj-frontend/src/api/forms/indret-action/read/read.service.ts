/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {  Observable } from 'rxjs';
import { IndretActionService } from '../../../controllers/IndretAction';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGGetFormService } from '../../yasag-get.service';


@Injectable()
export class IndretActionReadFormService extends YASAGGetFormService<__model.IndretAction> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: IndretActionService,
  ) {
    super('IndretActionRead', apiConfigService, ngZone);
    this.form = new FormGroup({
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
      id: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    });
    this.init()
  }

  submit(value: any = false, cache = true, only_cache = false): Observable<__model.IndretAction> {
    const result = val => this.service.read(val);
    return this._submit('__model.IndretAction', result, value, cache, only_cache );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.IndretAction> {
    if (submit) {
      this.submit(value);
    }
    return this._listen('__model.IndretAction', value, submit);
  }


  reset(value?: any): void {
    this.form.reset();
    super.reset(value, false); 
  }
  patch(value: any): void {
    this.form.patchValue(value);
  }
}
