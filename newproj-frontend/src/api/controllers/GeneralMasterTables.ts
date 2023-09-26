/* tslint:disable:max-line-length */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { APIConfigService } from '../apiconfig.service';

import * as __utils from '../yasag-utils';

import * as __model from '../model';

export interface ListParams {
  name?: string;
  type?: string;
  is_visible?: string;
  id_filter?: string;
  behaviour_ids?: string;
  /** A search term. */
  search?: string;
  /** Which field to use when ordering the results. */
  ordering?: string;
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
  data: __model.GeneralMasterTablesCreate;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface GetBehaviourIdsParams {
  name?: string;
  type?: string;
  is_visible?: string;
  id_filter?: string;
  behaviour_ids?: string;
  /** A search term. */
  search?: string;
  /** Which field to use when ordering the results. */
  ordering?: string;
  /** Number of results to return per page. */
  limit?: number;
  /** The initial index from which to return the results. */
  offset?: number;
  /** Master table to query */
  table?: string;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface TypesParams {
  name?: string;
  type?: string;
  is_visible?: string;
  id_filter?: string;
  behaviour_ids?: string;
  /** Search */
  search?: string;
  /** Which field to use when ordering the results. */
  ordering?: string;
  /** Number of results to return per page. */
  limit?: number;
  /** The initial index from which to return the results. */
  offset?: number;
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
  /** A unique integer value identifying this general master tables. */
  id: number;
}

export interface UpdateParams {
  data: __model.GeneralMasterTables;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this general master tables. */
  id: number;
}

export interface PartialUpdateParams {
  data: __model.GeneralMasterTables;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this general master tables. */
  id: number;
}

export interface DeleteParams {
  /** A unique integer value identifying this general master tables. */
  id: number;
}

@Injectable()
export class GeneralMasterTablesService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  list(params: ListParams, multipart = false): Observable<__model.GeneralMasterTablesList> {
    const queryParamBase = {
      name: params.name,
      type: params.type,
      is_visible: params.is_visible,
      id_filter: params.id_filter,
      behaviour_ids: params.behaviour_ids,
      search: params.search,
      ordering: params.ordering,
      limit: params.limit,
      offset: params.offset,
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.get<__model.GeneralMasterTablesList>(this.apiConfigService.options.apiUrl + `/general_master_tables/`, {params: queryParams});
  }

  /**
   * Create a new master table. If is_multiple=False (only wants to create one master table), it will create a single master table. In case of trying to create a master table that already exists, it will return an error.
   * If is_multiple=True (wants to create several master table), it will create a master table for each line (separated by \n). In case of repeating a master table (that already exists), it will NOT return an error and will bypass it.
   * By default (in case 'is_visible' and 'is_multiple' values are NOT passed):
   * - is_visible=True
   * - is_multiple=False
   */
  create(params: CreateParams, multipart = false): Observable<__model.GeneralMasterTables> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined = __utils.getBodyParamsWithoutUndefined(multipart, bodyParams);

    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.post<__model.GeneralMasterTables>(this.apiConfigService.options.apiUrl + `/general_master_tables/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** Endpoint to list all behaviour ids (the ids that entail special behaviour in the system) */
  getBehaviourIds(params: GetBehaviourIdsParams, multipart = false): Observable<__model.GeneralMasterTablesGetBehaviourIds> {
    const queryParamBase = {
      name: params.name,
      type: params.type,
      is_visible: params.is_visible,
      id_filter: params.id_filter,
      behaviour_ids: params.behaviour_ids,
      search: params.search,
      ordering: params.ordering,
      limit: params.limit,
      offset: params.offset,
      table: params.table,
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.get<__model.GeneralMasterTablesGetBehaviourIds>(this.apiConfigService.options.apiUrl + `/general_master_tables/get_behaviour_ids/`, {params: queryParams});
  }

  /** Endpoint returning the list of general system master table types */
  types(params: TypesParams, multipart = false): Observable<__model.GeneralMasterTablesTypes> {
    const queryParamBase = {
      name: params.name,
      type: params.type,
      is_visible: params.is_visible,
      id_filter: params.id_filter,
      behaviour_ids: params.behaviour_ids,
      search: params.search,
      ordering: params.ordering,
      limit: params.limit,
      offset: params.offset,
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.get<__model.GeneralMasterTablesTypes>(this.apiConfigService.options.apiUrl + `/general_master_tables/types/`, {params: queryParams});
  }

  read(params: ReadParams, multipart = false): Observable<__model.GeneralMasterTables> {
    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.GeneralMasterTables>(this.apiConfigService.options.apiUrl + `/general_master_tables/${pathParams.id}/`, {params: queryParams});
  }

  update(params: UpdateParams, multipart = false): Observable<__model.GeneralMasterTables> {
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
    return this.http.put<__model.GeneralMasterTables>(this.apiConfigService.options.apiUrl + `/general_master_tables/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  partialUpdate(params: PartialUpdateParams, multipart = false): Observable<__model.GeneralMasterTables> {
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
    return this.http.patch<__model.GeneralMasterTables>(this.apiConfigService.options.apiUrl + `/general_master_tables/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  delete(params: DeleteParams, multipart = false): Observable<string> {
    const pathParams = {
      id: params.id,
    };
    return this.http.delete(this.apiConfigService.options.apiUrl + `/general_master_tables/${pathParams.id}/`, {responseType: 'text'});
  }
}
