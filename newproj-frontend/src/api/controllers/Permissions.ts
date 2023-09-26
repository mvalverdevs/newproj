/* tslint:disable:max-line-length */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { APIConfigService } from '../apiconfig.service';

import * as __utils from '../yasag-utils';

import * as __model from '../model';

export interface PermissionsParams {
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

@Injectable()
export class PermissionsService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  permissions(params: PermissionsParams, multipart = false): Observable<__model.Permission> {
    const queryParamBase = {
      search: params.search,
      limit: params.limit,
      offset: params.offset,
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.get<__model.Permission>(this.apiConfigService.options.apiUrl + `/permissions/`, {params: queryParams});
  }
}
