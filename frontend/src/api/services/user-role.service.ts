/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { PaginatedUserRoleList } from '../models/paginated-user-role-list';
import { userRoleList } from '../fn/user-role/user-role-list';
import { UserRoleList$Params } from '../fn/user-role/user-role-list';

@Injectable({ providedIn: 'root' })
export class UserRoleService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `userRoleList()` */
  static readonly UserRoleListPath = '/api/user_role/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userRoleList()` instead.
   *
   * This method doesn't expect any request body.
   */
  userRoleList$Response(params?: UserRoleList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedUserRoleList>> {
    return userRoleList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userRoleList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userRoleList(params?: UserRoleList$Params, context?: HttpContext): Observable<PaginatedUserRoleList> {
    return this.userRoleList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginatedUserRoleList>): PaginatedUserRoleList => r.body)
    );
  }

}
