/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {  Observable } from 'rxjs';
import { IndretContactService } from '../../../controllers/IndretContact';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGPostFormService } from '../../yasag-post.service';


@Injectable()
export class IndretContactUpdateFormService extends YASAGPostFormService<__model.IndretContact> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: IndretContactService,
  ) {
    super('IndretContactUpdate', apiConfigService, ngZone);
    this.form = new FormGroup({
      data: new FormGroup({
        id: new FormControl({value: undefined, disabled: false}, []),
        indret: new FormControl({value: undefined, disabled: false}, []),
        relation: new FormControl({value: undefined, disabled: false}, []),
        first_name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
        last_name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
        email: new FormControl({value: undefined, disabled: false}, [Validators.email, Validators.maxLength(254), Validators.minLength(1), Validators.required]),
        phone: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(128), Validators.minLength(1), Validators.required]),
        scope_is_alimentary: new FormControl({value: undefined, disabled: false}, [Validators.required]),
        identification: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1)]),
        identification_type: new FormControl({value: undefined, disabled: false}, []),
        documents_accreditative: new FormControl([], []),
      }, [Validators.required]),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
      id: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    });
    this.init()
  }

  submit(value: any = false): Observable<__model.IndretContact> {
    const result = val => this.service.update(val);
    return this._submit('__model.IndretContact', result, 'null', value, false );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.IndretContact> {
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
