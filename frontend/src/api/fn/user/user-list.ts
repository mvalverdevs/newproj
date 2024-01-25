/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PaginatedUserList } from '../../models/paginated-user-list';

export interface UserList$Params {
  email?: string;

/**
 * List of nested objects
 */
  expand?: string;
  first_name?: string;
  is_active?: boolean;
  last_name?: string;

/**
 * Number of results to return per page.
 */
  limit?: number;

/**
 * The initial index from which to return the results.
 */
  offset?: number;

/**
 * Which field to use when ordering the results.
 */
  ordering?: string;
  phone?: string;
  roles?: string;

/**
 * A search term.
 */
  search?: string;
  username?: string;
}

export function userList(http: HttpClient, rootUrl: string, params?: UserList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedUserList>> {
  const rb = new RequestBuilder(rootUrl, userList.PATH, 'get');
  if (params) {
    rb.query('email', params.email, {});
    rb.query('expand', params.expand, {});
    rb.query('first_name', params.first_name, {});
    rb.query('is_active', params.is_active, {});
    rb.query('last_name', params.last_name, {});
    rb.query('limit', params.limit, {});
    rb.query('offset', params.offset, {});
    rb.query('ordering', params.ordering, {});
    rb.query('phone', params.phone, {});
    rb.query('roles', params.roles, {});
    rb.query('search', params.search, {});
    rb.query('username', params.username, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PaginatedUserList>;
    })
  );
}

userList.PATH = '/api/user/';
