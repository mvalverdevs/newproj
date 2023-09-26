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
  /** From created. */
  from_creation_datetime?: string;
  /** To created. */
  to_creation_datetime?: string;
  /** url on wich the action is performed */
  url?: string;
  /** ip that makes the request */
  ip?: string;
  /** response code */
  status_code?: string;
  /** user who performs the action */
  executor_user?: string;
  /** action */
  action?: string;
  /** system to which the service belongs */
  system?: string;
  /** registry identifier */
  log_id?: string;
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
  /** A unique integer value identifying this Action log. */
  id: number;
}

@Injectable()
export class ActionloggingService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  /** Method to list actions. The result is paginated */
  list(params: ListParams, multipart = false): Observable<__model.ActionloggingList> {
    const queryParamBase = {
      search: params.search,
      limit: params.limit,
      offset: params.offset,
      from_creation_datetime: params.from_creation_datetime,
      to_creation_datetime: params.to_creation_datetime,
      url: params.url,
      ip: params.ip,
      status_code: params.status_code,
      executor_user: params.executor_user,
      action: params.action,
      system: params.system,
      log_id: params.log_id,
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.get<__model.ActionloggingList>(this.apiConfigService.options.apiUrl + `/actionlogging/`, {params: queryParams});
  }

  /** Actionlogging query services. */
  read(params: ReadParams, multipart = false): Observable<__model.LoggedAction> {
    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.LoggedAction>(this.apiConfigService.options.apiUrl + `/actionlogging/${pathParams.id}/`, {params: queryParams});
  }
}
