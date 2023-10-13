/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PatchedUser } from '../../models/patched-user';
import { User } from '../../models/user';

export interface UserPartialUpdate$Json$Params {

/**
 * A unique integer value identifying this user.
 */
  id: number;
      body?: PatchedUser
}

export function userPartialUpdate$Json(http: HttpClient, rootUrl: string, params: UserPartialUpdate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
  const rb = new RequestBuilder(rootUrl, userPartialUpdate$Json.PATH, 'patch');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<User>;
    })
  );
}

userPartialUpdate$Json.PATH = '/api/user/{id}/';
