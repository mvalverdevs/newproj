/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {  Observable } from 'rxjs';
import { DocumentLibraryService } from '../../../controllers/DocumentLibrary';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGPostFormService } from '../../yasag-post.service';


@Injectable()
export class DocumentLibraryUpdateFormService extends YASAGPostFormService<__model.DocumentLibrary> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: DocumentLibraryService,
  ) {
    super('DocumentLibraryUpdate', apiConfigService, ngZone);
    this.form = new FormGroup({
      data: new FormGroup({
        id: new FormControl({value: undefined, disabled: false}, []),
        name: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(512), Validators.minLength(1), Validators.required]),
        title: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(512)]),
        author: new FormControl({value: undefined, disabled: false}, [Validators.maxLength(512)]),
        type_license: new FormControl({value: undefined, disabled: false}, []),
        description: new FormControl({value: undefined, disabled: false}, []),
        expiry_date: new FormControl({value: undefined, disabled: false}, []),
        visible: new FormControl({value: undefined, disabled: false}, []),
        category: new FormControl({value: undefined, disabled: false}, []),
      }, [Validators.required]),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
      id: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    });
    this.init()
  }

  submit(value: any = false): Observable<__model.DocumentLibrary> {
    const result = val => this.service.update(val);
    return this._submit('__model.DocumentLibrary', result, 'null', value, false );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.DocumentLibrary> {
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
