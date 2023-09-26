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
export class GeneralMasterTablesUpdateFormService extends YASAGPostFormService<__model.GeneralMasterTables> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: GeneralMasterTablesService,
  ) {
    super('GeneralMasterTablesUpdate', apiConfigService, ngZone);
    this.form = new FormGroup({
      data: new FormGroup({
        id: new FormControl({value: undefined, disabled: false}, []),
        name: new FormControl({value: undefined, disabled: false}, [Validators.minLength(1), Validators.required]),
        type: new FormControl({value: undefined, disabled: false}, [Validators.required]),
        is_visible: new FormControl({value: undefined, disabled: false}, []),
        is_editable: new FormControl({value: undefined, disabled: false}, []),
        is_deletable: new FormControl({value: undefined, disabled: false}, []),
        behaviour_id: new FormControl([], []),
        parent_table: new FormControl([], [Validators.required]),
      }, [Validators.required]),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
      id: new FormControl({value: undefined, disabled: false}, [Validators.required]),
    });
    this.init()
  }

  submit(value: any = false): Observable<__model.GeneralMasterTables> {
    const result = val => this.service.update(val);
    return this._submit('__model.GeneralMasterTables', result, 'null', value, false );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.GeneralMasterTables> {
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
