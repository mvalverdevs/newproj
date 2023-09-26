/* tslint:disable:max-line-length */
/**
 * v1
 * GEORest
 * netiproa.corppro.imi.bcn:447
 */

import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIConfigServiceOptions {
  public apiUrl = environment.geoUrl;
}
@Injectable({
  providedIn: 'root'
})
export class APIConfigService {
  public options: APIConfigServiceOptions;
  constructor( options: APIConfigServiceOptions ) {
    this.options = options;
  }
}
