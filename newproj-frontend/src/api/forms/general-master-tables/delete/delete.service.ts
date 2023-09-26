/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {  Observable } from 'rxjs';
import { GeneralMasterTablesService } from '../../../controllers/GeneralMasterTables';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGPostFormService } from '../../yasag-post.service';


@Injectable()
export class GeneralMasterTablesDeleteFormService extends YASAGPostFormService<string> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: GeneralMasterTablesService,
  ) {
    super('GeneralMasterTablesDelete', apiConfigService, ngZone);
    this.form = new FormGroup({
      id: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    });
    this.init()
  }

  submit(value: any = false): Observable<string> {
    const result = val => this.service.delete(val);
    return this._submit('string', result, 'null', value, false );
  }
  listen(value: any = false, submit: boolean = true): Observable<string> {
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
