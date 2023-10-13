/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PaginatedUserRoleList } from '../../models/paginated-user-role-list';

export interface UserRoleList$Params {

/**
 * Number of results to return per page.
 */
  limit?: number;

/**
 * The initial index from which to return the results.
 */
  offset?: number;

/**
 * A search term.
 */
  search?: string;
}

export function userRoleList(http: HttpClient, rootUrl: string, params?: UserRoleList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedUserRoleList>> {
  const rb = new RequestBuilder(rootUrl, userRoleList.PATH, 'get');
  if (params) {
    rb.query('limit', params.limit, {});
    rb.query('offset', params.offset, {});
    rb.query('search', params.search, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PaginatedUserRoleList>;
    })
  );
}

userRoleList.PATH = '/api/user_role/';
