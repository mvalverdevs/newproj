/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Permission } from '../../models/permission';

export interface UserPermissionsRetrieve$Params {
}

export function userPermissionsRetrieve(http: HttpClient, rootUrl: string, params?: UserPermissionsRetrieve$Params, context?: HttpContext): Observable<StrictHttpResponse<Permission>> {
  const rb = new RequestBuilder(rootUrl, userPermissionsRetrieve.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Permission>;
    })
  );
}

userPermissionsRetrieve.PATH = '/api/user/permissions/';
