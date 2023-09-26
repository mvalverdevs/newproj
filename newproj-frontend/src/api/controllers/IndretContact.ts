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
  data: __model.IndretContact;
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
  /** A unique integer value identifying this indret contact. */
  id: number;
}

export interface UpdateParams {
  data: __model.IndretContact;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this indret contact. */
  id: number;
}

export interface PartialUpdateParams {
  data: __model.IndretContact;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this indret contact. */
  id: number;
}

@Injectable()
export class IndretContactService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  list(params: ListParams, multipart = false): Observable<__model.IndretContactList> {
    const queryParamBase = {
      search: params.search,
      limit: params.limit,
      offset: params.offset,
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.get<__model.IndretContactList>(this.apiConfigService.options.apiUrl + `/indret_contact/`, {params: queryParams});
  }

  create(params: CreateParams, multipart = false): Observable<__model.IndretContact> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined = __utils.getBodyParamsWithoutUndefined(multipart, bodyParams);

    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.post<__model.IndretContact>(this.apiConfigService.options.apiUrl + `/indret_contact/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  read(params: ReadParams, multipart = false): Observable<__model.IndretContact> {
    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.IndretContact>(this.apiConfigService.options.apiUrl + `/indret_contact/${pathParams.id}/`, {params: queryParams});
  }

  update(params: UpdateParams, multipart = false): Observable<__model.IndretContact> {
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
    return this.http.put<__model.IndretContact>(this.apiConfigService.options.apiUrl + `/indret_contact/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  partialUpdate(params: PartialUpdateParams, multipart = false): Observable<__model.IndretContact> {
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
    return this.http.patch<__model.IndretContact>(this.apiConfigService.options.apiUrl + `/indret_contact/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }
}
