/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { PaginatedPermissionList } from '../models/paginated-permission-list';
import { permissionsList } from '../fn/permissions/permissions-list';
import { PermissionsList$Params } from '../fn/permissions/permissions-list';

@Injectable({ providedIn: 'root' })
export class PermissionsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `permissionsList()` */
  static readonly PermissionsListPath = '/api/permissions/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `permissionsList()` instead.
   *
   * This method doesn't expect any request body.
   */
  permissionsList$Response(params?: PermissionsList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedPermissionList>> {
    return permissionsList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `permissionsList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  permissionsList(params?: PermissionsList$Params, context?: HttpContext): Observable<PaginatedPermissionList> {
    return this.permissionsList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginatedPermissionList>): PaginatedPermissionList => r.body)
    );
  }

}
