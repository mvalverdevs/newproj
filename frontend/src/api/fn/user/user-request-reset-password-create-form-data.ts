/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Email } from '../../models/email';
import { User } from '../../models/user';

export interface UserRequestResetPasswordCreate$FormData$Params {
      body: Email
}

export function userRequestResetPasswordCreate$FormData(http: HttpClient, rootUrl: string, params: UserRequestResetPasswordCreate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
  const rb = new RequestBuilder(rootUrl, userRequestResetPasswordCreate$FormData.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
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

userRequestResetPasswordCreate$FormData.PATH = '/api/user/request_reset_password/';
