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
  name?: string;
  center?: string;
  type_of_road_name?: string;
  type_of_road_id?: string;
  street_name?: string;
  street_id?: string;
  district_id?: string;
  district_name?: string;
  neighborhood_id?: string;
  neighborhood_name?: string;
  identification?: string;
  types?: string;
  categories?: string;
  titularity__group?: string;
  circuits__type?: string;
  address?: string;
  titularity_identification?: string;
  titularity_name?: string;
  skip_indret?: string;
  has_no_circuits?: string;
  titularity_filter?: string;
  address_filter?: string;
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
  data: __model.Indret;
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
  /** A unique integer value identifying this indret. */
  id: number;
}

export interface UpdateParams {
  data: __model.Indret;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this indret. */
  id: number;
}

export interface PartialUpdateParams {
  data: __model.Indret;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this indret. */
  id: number;
}

@Injectable()
export class IndretService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  list(params: ListParams, multipart = false): Observable<__model.IndretList> {
    const queryParamBase = {
      search: params.search,
      name: params.name,
      center: params.center,
      type_of_road_name: params.type_of_road_name,
      type_of_road_id: params.type_of_road_id,
      street_name: params.street_name,
      street_id: params.street_id,
      district_id: params.district_id,
      district_name: params.district_name,
      neighborhood_id: params.neighborhood_id,
      neighborhood_name: params.neighborhood_name,
      identification: params.identification,
      types: params.types,
      categories: params.categories,
      titularity__group: params.titularity__group,
      circuits__type: params.circuits__type,
      address: params.address,
      titularity_identification: params.titularity_identification,
      titularity_name: params.titularity_name,
      skip_indret: params.skip_indret,
      has_no_circuits: params.has_no_circuits,
      titularity_filter: params.titularity_filter,
      address_filter: params.address_filter,
      limit: params.limit,
      offset: params.offset,
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.get<__model.IndretList>(this.apiConfigService.options.apiUrl + `/indret/`, {params: queryParams});
  }

  create(params: CreateParams, multipart = false): Observable<__model.Indret> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined = __utils.getBodyParamsWithoutUndefined(multipart, bodyParams);

    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.post<__model.Indret>(this.apiConfigService.options.apiUrl + `/indret/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  read(params: ReadParams, multipart = false): Observable<__model.Indret> {
    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.Indret>(this.apiConfigService.options.apiUrl + `/indret/${pathParams.id}/`, {params: queryParams});
  }

  update(params: UpdateParams, multipart = false): Observable<__model.Indret> {
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
    return this.http.put<__model.Indret>(this.apiConfigService.options.apiUrl + `/indret/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  partialUpdate(params: PartialUpdateParams, multipart = false): Observable<__model.Indret> {
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
    return this.http.patch<__model.Indret>(this.apiConfigService.options.apiUrl + `/indret/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }
}
