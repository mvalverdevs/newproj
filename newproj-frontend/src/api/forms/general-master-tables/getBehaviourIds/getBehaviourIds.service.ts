/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {  Observable } from 'rxjs';
import { GeneralMasterTablesService } from '../../../controllers/GeneralMasterTables';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGGetFormService } from '../../yasag-get.service';


@Injectable()
export class GeneralMasterTablesGetBehaviourIdsFormService extends YASAGGetFormService<__model.GeneralMasterTablesGetBehaviourIds> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: GeneralMasterTablesService,
  ) {
    super('GeneralMasterTablesGetBehaviourIds', apiConfigService, ngZone);
    this.form = new FormGroup({
      name: new FormControl({value: undefined, disabled: false}, []),
      type: new FormControl({value: undefined, disabled: false}, []),
      is_visible: new FormControl({value: undefined, disabled: false}, []),
      id_filter: new FormControl({value: undefined, disabled: false}, []),
      behaviour_ids: new FormControl({value: undefined, disabled: false}, []),
      search: new FormControl({value: undefined, disabled: false}, []),
      ordering: new FormControl({value: undefined, disabled: false}, []),
      limit: new FormControl({value: undefined, disabled: false}, []),
      offset: new FormControl({value: undefined, disabled: false}, []),
      table: new FormControl({value: undefined, disabled: false}, []),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
    });
    this.init()
  }

  submit(value: any = false, cache = true, only_cache = false): Observable<__model.GeneralMasterTablesGetBehaviourIds> {
    const result = val => this.service.getBehaviourIds(val);
    return this._submit('__model.GeneralMasterTablesGetBehaviourIds', result, value, cache, only_cache );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.GeneralMasterTablesGetBehaviourIds> {
    if (submit) {
      this.submit(value);
    }
    return this._listen('__model.GeneralMasterTablesGetBehaviourIds', value, submit);
  }


  reset(value?: any): void {
    this.form.reset();
    super.reset(value, false); 
  }
  patch(value: any): void {
    this.form.patchValue(value);
  }
}
