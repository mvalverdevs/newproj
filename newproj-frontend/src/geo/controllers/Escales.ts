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

export interface EscalesGetParams {
  /** Identificador d'escala */
  id: string;
}

@Injectable()
export class EscalesService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  /**
   * Retorna la llista de tipus d'escales
   * http://netiproa.corppro.imi.bcn:447/swagger/swagger-ui.html#!/Escales/Escales_Escales
   */
  escales(): Observable<__model.ConjuntElementsTipusEscala> {
    return this.http.get<__model.ConjuntElementsTipusEscala>(this.apiConfigService.options.apiUrl + `/api/Escales`);
  }

  /**
   * Retorna les dades d'un tipuis d'escala
   * http://netiproa.corppro.imi.bcn:447/swagger/swagger-ui.html#!/Escales/Escales_Escales_Get
   */
  escalesGet(params: EscalesGetParams): Observable<__model.ConjuntElementsTipusEscala> {
    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.ConjuntElementsTipusEscala>(this.apiConfigService.options.apiUrl + `/api/Escales/${pathParams.id}`);
  }
}
