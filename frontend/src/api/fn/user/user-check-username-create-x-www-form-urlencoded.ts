/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CheckUsername } from '../../models/check-username';
import { CheckUserResponse } from '../../models/check-user-response';

export interface UserCheckUsernameCreate$XWwwFormUrlencoded$Params {
      body: CheckUsername
}

export function userCheckUsernameCreate$XWwwFormUrlencoded(http: HttpClient, rootUrl: string, params: UserCheckUsernameCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<CheckUserResponse>> {
  const rb = new RequestBuilder(rootUrl, userCheckUsernameCreate$XWwwFormUrlencoded.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/x-www-form-urlencoded');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CheckUserResponse>;
    })
  );
}

userCheckUsernameCreate$XWwwFormUrlencoded.PATH = '/api/user/check_username/';
