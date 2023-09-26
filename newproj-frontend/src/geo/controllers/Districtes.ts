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

export interface DistrictesGetParams {
  /** Códi de districte */
  id: string;
}

@Injectable()
export class DistrictesService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  /**
   * Retorna la llista de districtes de la ciutat
   * http://netiproa.corppro.imi.bcn:447/swagger/swagger-ui.html#!/Districtes/Districtes_Districtes
   */
  districtes(): Observable<__model.ConjuntElementsPoligons> {
    return this.http.get<__model.ConjuntElementsPoligons>(this.apiConfigService.options.apiUrl + `/api/Districtes`);
  }

  /**
   * Retorna les dades d'un districte de la ciutat
   * http://netiproa.corppro.imi.bcn:447/swagger/swagger-ui.html#!/Districtes/Districtes_Districtes_Get
   */
  districtesGet(params: DistrictesGetParams): Observable<__model.ConjuntElementsPoligons> {
    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.ConjuntElementsPoligons>(this.apiConfigService.options.apiUrl + `/api/Districtes/${pathParams.id}`);
  }
}
