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
  date_scheduled__gte?: string;
  date_scheduled__lte?: string;
  status__iexact?: string;
  action_type?: string;
  inspection_reason?: string;
  technicians?: string;
  result__caution_measures?: string;
  result?: string;
  indret?: string;
  indret__types?: string;
  indrets?: string;
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
  data: __model.IndretAction;
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
  /** A unique integer value identifying this indret action. */
  id: number;
}

export interface UpdateParams {
  data: __model.IndretAction;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this indret action. */
  id: number;
}

export interface PartialUpdateParams {
  data: __model.IndretAction;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this indret action. */
  id: number;
}

@Injectable()
export class IndretActionService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  list(params: ListParams, multipart = false): Observable<__model.IndretActionList> {
    const queryParamBase = {
      search: params.search,
      date_scheduled__gte: params.date_scheduled__gte,
      date_scheduled__lte: params.date_scheduled__lte,
      status__iexact: params.status__iexact,
      action_type: params.action_type,
      inspection_reason: params.inspection_reason,
      technicians: params.technicians,
      result__caution_measures: params.result__caution_measures,
      result: params.result,
      indret: params.indret,
      indret__types: params.indret__types,
      indrets: params.indrets,
      limit: params.limit,
      offset: params.offset,
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.get<__model.IndretActionList>(this.apiConfigService.options.apiUrl + `/indret_action/`, {params: queryParams});
  }

  create(params: CreateParams, multipart = false): Observable<__model.IndretAction> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined = __utils.getBodyParamsWithoutUndefined(multipart, bodyParams);

    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.post<__model.IndretAction>(this.apiConfigService.options.apiUrl + `/indret_action/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  read(params: ReadParams, multipart = false): Observable<__model.IndretAction> {
    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.IndretAction>(this.apiConfigService.options.apiUrl + `/indret_action/${pathParams.id}/`, {params: queryParams});
  }

  update(params: UpdateParams, multipart = false): Observable<__model.IndretAction> {
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
    return this.http.put<__model.IndretAction>(this.apiConfigService.options.apiUrl + `/indret_action/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  partialUpdate(params: PartialUpdateParams, multipart = false): Observable<__model.IndretAction> {
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
    return this.http.patch<__model.IndretAction>(this.apiConfigService.options.apiUrl + `/indret_action/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }
}
