/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { User } from '../../models/user';
import { UserLogin } from '../../models/user-login';

export interface UserLogoutCreate$XWwwFormUrlencoded$Params {

/**
 * List of nested objects
 */
  expand?: string;
      body: UserLogin
}

export function userLogoutCreate$XWwwFormUrlencoded(http: HttpClient, rootUrl: string, params: UserLogoutCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
  const rb = new RequestBuilder(rootUrl, userLogoutCreate$XWwwFormUrlencoded.PATH, 'post');
  if (params) {
    rb.query('expand', params.expand, {});
    rb.body(params.body, 'application/x-www-form-urlencoded');
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

userLogoutCreate$XWwwFormUrlencoded.PATH = '/api/user/logout/';
