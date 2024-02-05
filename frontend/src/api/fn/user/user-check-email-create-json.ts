/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CheckEmail } from '../../models/check-email';
import { CheckUserResponse } from '../../models/check-user-response';

export interface UserCheckEmailCreate$Json$Params {
      body: CheckEmail
}

export function userCheckEmailCreate$Json(http: HttpClient, rootUrl: string, params: UserCheckEmailCreate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CheckUserResponse>> {
  const rb = new RequestBuilder(rootUrl, userCheckEmailCreate$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

userCheckEmailCreate$Json.PATH = '/api/user/check_email/';
