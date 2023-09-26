/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {  Observable } from 'rxjs';
import { DocumentLibraryService } from '../../../controllers/DocumentLibrary';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGGetFormService } from '../../yasag-get.service';


@Injectable()
export class DocumentLibraryListFormService extends YASAGGetFormService<__model.DocumentLibraryList> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: DocumentLibraryService,
  ) {
    super('DocumentLibraryList', apiConfigService, ngZone);
    this.form = new FormGroup({
      search: new FormControl({value: undefined, disabled: false}, []),
      limit: new FormControl({value: undefined, disabled: false}, []),
      offset: new FormControl({value: undefined, disabled: false}, []),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
    });
    this.init()
  }

  submit(value: any = false, cache = true, only_cache = false): Observable<__model.DocumentLibraryList> {
    const result = val => this.service.list(val);
    return this._submit('__model.DocumentLibraryList', result, value, cache, only_cache );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.DocumentLibraryList> {
    if (submit) {
      this.submit(value);
    }
    return this._listen('__model.DocumentLibraryList', value, submit);
  }


  reset(value?: any): void {
    this.form.reset();
    super.reset(value, false); 
  }
  patch(value: any): void {
    this.form.patchValue(value);
  }
}
