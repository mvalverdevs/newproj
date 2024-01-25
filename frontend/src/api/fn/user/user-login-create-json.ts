/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserLogin } from '../../models/user-login';

export interface UserLoginCreate$Json$Params {

/**
 * List of nested objects
 */
  expand?: string;
      body: UserLogin
}

export function userLoginCreate$Json(http: HttpClient, rootUrl: string, params: UserLoginCreate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserLogin>> {
  const rb = new RequestBuilder(rootUrl, userLoginCreate$Json.PATH, 'post');
  if (params) {
    rb.query('expand', params.expand, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserLogin>;
    })
  );
}

userLoginCreate$Json.PATH = '/api/user/login/';
