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
  identification__iexact?: string;
  identification__icontains?: string;
  CIF__iexact?: string;
  CIF__icontains?: string;
  social_reason__iexact?: string;
  social_reason__icontains?: string;
  full_name_filter?: string;
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
  data: __model.IndretTitular;
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
  /** A unique integer value identifying this indret titular. */
  id: number;
}

export interface UpdateParams {
  data: __model.IndretTitular;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this indret titular. */
  id: number;
}

export interface PartialUpdateParams {
  data: __model.IndretTitular;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this indret titular. */
  id: number;
}

@Injectable()
export class IndretTitularService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  list(params: ListParams, multipart = false): Observable<__model.IndretTitularList> {
    const queryParamBase = {
      search: params.search,
      identification__iexact: params.identification__iexact,
      identification__icontains: params.identification__icontains,
      CIF__iexact: params.CIF__iexact,
      CIF__icontains: params.CIF__icontains,
      social_reason__iexact: params.social_reason__iexact,
      social_reason__icontains: params.social_reason__icontains,
      full_name_filter: params.full_name_filter,
      limit: params.limit,
      offset: params.offset,
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.get<__model.IndretTitularList>(this.apiConfigService.options.apiUrl + `/indret_titular/`, {params: queryParams});
  }

  create(params: CreateParams, multipart = false): Observable<__model.IndretTitular> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined = __utils.getBodyParamsWithoutUndefined(multipart, bodyParams);

    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.post<__model.IndretTitular>(this.apiConfigService.options.apiUrl + `/indret_titular/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  read(params: ReadParams, multipart = false): Observable<__model.IndretTitular> {
    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.IndretTitular>(this.apiConfigService.options.apiUrl + `/indret_titular/${pathParams.id}/`, {params: queryParams});
  }

  update(params: UpdateParams, multipart = false): Observable<__model.IndretTitular> {
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
    return this.http.put<__model.IndretTitular>(this.apiConfigService.options.apiUrl + `/indret_titular/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  partialUpdate(params: PartialUpdateParams, multipart = false): Observable<__model.IndretTitular> {
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
    return this.http.patch<__model.IndretTitular>(this.apiConfigService.options.apiUrl + `/indret_titular/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }
}
