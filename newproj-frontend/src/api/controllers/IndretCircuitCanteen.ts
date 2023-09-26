/* tslint:disable:max-line-length */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { APIConfigService } from '../apiconfig.service';

import * as __utils from '../yasag-utils';

import * as __model from '../model';

export interface ListParams {
  /** A search term. */
  search?: string;
  /** Number of results to return per page. */
  limit?: number;
  /** The initial index from which to return the results. */
  offset?: number;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface CreateParams {
  data: __model.IndretCircuitCanteen;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface ReadParams {
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this indret circuit canteen. */
  id: number;
}

export interface UpdateParams {
  data: __model.IndretCircuitCanteen;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this indret circuit canteen. */
  id: number;
}

export interface PartialUpdateParams {
  data: __model.IndretCircuitCanteen;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this indret circuit canteen. */
  id: number;
}

@Injectable()
export class IndretCircuitCanteenService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  list(params: ListParams, multipart = false): Observable<__model.IndretCircuitCanteenList> {
    const queryParamBase = {
      search: params.search,
      limit: params.limit,
      offset: params.offset,
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.get<__model.IndretCircuitCanteenList>(this.apiConfigService.options.apiUrl + `/indret_circuit_canteen/`, {params: queryParams});
  }

  create(params: CreateParams, multipart = false): Observable<__model.IndretCircuitCanteen> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined = __utils.getBodyParamsWithoutUndefined(multipart, bodyParams);

    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.post<__model.IndretCircuitCanteen>(this.apiConfigService.options.apiUrl + `/indret_circuit_canteen/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  read(params: ReadParams, multipart = false): Observable<__model.IndretCircuitCanteen> {
    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.IndretCircuitCanteen>(this.apiConfigService.options.apiUrl + `/indret_circuit_canteen/${pathParams.id}/`, {params: queryParams});
  }

  update(params: UpdateParams, multipart = false): Observable<__model.IndretCircuitCanteen> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined = __utils.getBodyParamsWithoutUndefined(multipart, bodyParams);

    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    const pathParams = {
      id: params.id,
    };
    return this.http.put<__model.IndretCircuitCanteen>(this.apiConfigService.options.apiUrl + `/indret_circuit_canteen/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  partialUpdate(params: PartialUpdateParams, multipart = false): Observable<__model.IndretCircuitCanteen> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined = __utils.getBodyParamsWithoutUndefined(multipart, bodyParams);

    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    const pathParams = {
      id: params.id,
    };
    return this.http.patch<__model.IndretCircuitCanteen>(this.apiConfigService.options.apiUrl + `/indret_circuit_canteen/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }
}
