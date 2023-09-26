/* tslint:disable:max-line-length */
/**
 * v1
 * GEORest
 * netiproa.corppro.imi.bcn:447
 */

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { APIConfigService } from '../apiconfig.service';

import * as __model from '../model';

export interface TipusViesGetParams {
  /** Codi de tipus de via */
  id: string;
}

@Injectable()
export class TipusViesService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  /**
   * Retorna la llista de tipus de vies
   * http://netiproa.corppro.imi.bcn:447/swagger/swagger-ui.html#!/TipusVies/TipusVies_TipusVies
   */
  tipusVies(): Observable<__model.ConjuntElementsTipusVia> {
    return this.http.get<__model.ConjuntElementsTipusVia>(this.apiConfigService.options.apiUrl + `/api/TipusVies`);
  }

  /**
   * Retorna les dades d'un tipus de via
   * http://netiproa.corppro.imi.bcn:447/swagger/swagger-ui.html#!/TipusVies/TipusVies_TipusVies_Get
   */
  tipusViesGet(params: TipusViesGetParams): Observable<__model.ConjuntElementsTipusVia> {
    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.ConjuntElementsTipusVia>(this.apiConfigService.options.apiUrl + `/api/TipusVies/${pathParams.id}`);
  }
}
