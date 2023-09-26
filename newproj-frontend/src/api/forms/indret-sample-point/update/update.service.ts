/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {  Observable } from 'rxjs';
import { IndretSamplePointService } from '../../../controllers/IndretSamplePoint';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGPostFormService } from '../../yasag-post.service';


@Injectable()
export class IndretSamplePointUpdateFormService extends YASAGPostFormService<__model.SamplePoint> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: IndretSamplePointService,
  ) {
    super('IndretSamplePointUpdate', apiConfigService, ngZone);
    this.form = new FormGroup({
      data: new FormGroup({
        id: new FormControl({value: undefined, disabled: false}, []),
        name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
        is_active: new FormControl({value: undefined, disabled: false}, []),
        indret_circuit: new FormControl({value: undefined, disabled: false}, []),
      }, [Validators.required]),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
      id: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    });
    this.init()
  }

  submit(value: any = false): Observable<__model.SamplePoint> {
    const result = val => this.service.update(val);
    return this._submit('__model.SamplePoint', result, 'null', value, false );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.SamplePoint> {
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
