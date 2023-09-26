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
export class DocumentLibraryUploadFormService extends YASAGPostFormService<__model.DocumentLibraryFileUpload> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: DocumentLibraryService,
  ) {
    super('DocumentLibraryUpload', apiConfigService, ngZone);
    this.form = new FormGroup({
      data: new FormGroup({

      }, [Validators.required]),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
    });
    this.init()
  }

  submit(value: any = false): Observable<__model.DocumentLibraryFileUpload> {
    const result = val => this.service.upload(val);
    return this._submit('__model.DocumentLibraryFileUpload', result, 'null', value, false );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.DocumentLibraryFileUpload> {
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
