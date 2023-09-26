/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {  Observable } from 'rxjs';
import { DocumentLibraryService } from '../../../controllers/DocumentLibrary';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGGetFormService } from '../../yasag-get.service';


@Injectable()
export class DocumentLibraryBase64FormService extends YASAGGetFormService<__model.DocumentLibraryBase64> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: DocumentLibraryService,
  ) {
    super('DocumentLibraryBase64', apiConfigService, ngZone);
    this.form = new FormGroup({
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
      id: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    });
    this.init()
  }

  submit(value: any = false, cache = true, only_cache = false): Observable<__model.DocumentLibraryBase64> {
    const result = val => this.service.base64(val);
    return this._submit('__model.DocumentLibraryBase64', result, value, cache, only_cache );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.DocumentLibraryBase64> {
    if (submit) {
      this.submit(value);
    }
    return this._listen('__model.DocumentLibraryBase64', value, submit);
  }


  reset(value?: any): void {
    this.form.reset();
    super.reset(value, false); 
  }
  patch(value: any): void {
    this.form.patchValue(value);
  }
}
