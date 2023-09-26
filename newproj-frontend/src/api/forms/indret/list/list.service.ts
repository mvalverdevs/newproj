/* tslint:disable:max-line-length */

import { Injectable, NgZone } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {  Observable } from 'rxjs';
import { IndretService } from '../../../controllers/Indret';
import * as __model from '../../../model';
import { APIConfigService } from '../../../apiconfig.service';

import * as __utils from '../../../yasag-utils';

import { YASAGGetFormService } from '../../yasag-get.service';


@Injectable()
export class IndretListFormService extends YASAGGetFormService<__model.IndretList> {
  constructor(
    apiConfigService: APIConfigService,
    ngZone: NgZone,
    private service: IndretService,
  ) {
    super('IndretList', apiConfigService, ngZone);
    this.form = new FormGroup({
      search: new FormControl({value: undefined, disabled: false}, []),
      name: new FormControl({value: undefined, disabled: false}, []),
      center: new FormControl({value: undefined, disabled: false}, []),
      type_of_road_name: new FormControl({value: undefined, disabled: false}, []),
      type_of_road_id: new FormControl({value: undefined, disabled: false}, []),
      street_name: new FormControl({value: undefined, disabled: false}, []),
      street_id: new FormControl({value: undefined, disabled: false}, []),
      district_id: new FormControl({value: undefined, disabled: false}, []),
      district_name: new FormControl({value: undefined, disabled: false}, []),
      neighborhood_id: new FormControl({value: undefined, disabled: false}, []),
      neighborhood_name: new FormControl({value: undefined, disabled: false}, []),
      identification: new FormControl({value: undefined, disabled: false}, []),
      types: new FormControl({value: undefined, disabled: false}, []),
      categories: new FormControl({value: undefined, disabled: false}, []),
      titularity__group: new FormControl({value: undefined, disabled: false}, []),
      circuits__type: new FormControl({value: undefined, disabled: false}, []),
      address: new FormControl({value: undefined, disabled: false}, []),
      titularity_identification: new FormControl({value: undefined, disabled: false}, []),
      titularity_name: new FormControl({value: undefined, disabled: false}, []),
      skip_indret: new FormControl({value: undefined, disabled: false}, []),
      has_no_circuits: new FormControl({value: undefined, disabled: false}, []),
      titularity_filter: new FormControl({value: undefined, disabled: false}, []),
      address_filter: new FormControl({value: undefined, disabled: false}, []),
      limit: new FormControl({value: undefined, disabled: false}, []),
      offset: new FormControl({value: undefined, disabled: false}, []),
      fields: new FormControl({value: undefined, disabled: false}, []),
      expand: new FormControl({value: undefined, disabled: false}, []),
    });
    this.init()
  }

  submit(value: any = false, cache = true, only_cache = false): Observable<__model.IndretList> {
    const result = val => this.service.list(val);
    return this._submit('__model.IndretList', result, value, cache, only_cache );
  }
  listen(value: any = false, submit: boolean = true): Observable<__model.IndretList> {
    if (submit) {
      this.submit(value);
    }
    return this._listen('__model.IndretList', value, submit);
  }


  reset(value?: any): void {
    this.form.reset();
    super.reset(value, false); 
  }
  patch(value: any): void {
    this.form.patchValue(value);
  }
}
