/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {  Observable } from 'rxjs';
import { IndretActionService } from '../../../controllers/IndretAction';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGGetFormService } from '../../yasag-get.service';


@Injectable()
export class IndretActionListFormService extends YASAGGetFormService<__model.IndretActionList> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: IndretActionService,
  ) {
    super('IndretActionList', apiConfigService, ngZone);
    this.form = new FormGroup({
      search: new FormControl({value: undefined, disabled: false}, []),
      date_scheduled__gte: new FormControl({value: undefined, disabled: false}, []),
      date_scheduled__lte: new FormControl({value: undefined, disabled: false}, []),
      status__iexact: new FormControl({value: undefined, disabled: false}, []),
      action_type: new FormControl({value: undefined, disabled: false}, []),
      inspection_reason: new FormControl({value: undefined, disabled: false}, []),
      technicians: new FormControl({value: undefined, disabled: false}, []),
      result__caution_measures: new FormControl({value: undefined, disabled: false}, []),
      result: new FormControl({value: undefined, disabled: false}, []),
      indret: new FormControl({value: undefined, disabled: false}, []),
      indret__types: new FormControl({value: undefined, disabled: false}, []),
      indrets: new FormControl({value: undefined, disabled: false}, []),
      limit: new FormControl({value: undefined, disabled: false}, []),
      offset: new FormControl({value: undefined, disabled: false}, []),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
    });
    this.init()
  }

  submit(value: any = false, cache = true, only_cache = false): Observable<__model.IndretActionList> {
    const result = val => this.service.list(val);
    return this._submit('__model.IndretActionList', result, value, cache, only_cache );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.IndretActionList> {
    if (submit) {
      this.submit(value);
    }
    return this._listen('__model.IndretActionList', value, submit);
  }


  reset(value?: any): void {
    this.form.reset();
    super.reset(value, false); 
  }
  patch(value: any): void {
    this.form.patchValue(value);
  }
}
