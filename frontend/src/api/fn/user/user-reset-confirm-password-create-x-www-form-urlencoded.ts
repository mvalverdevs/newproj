/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ResetPassword } from '../../models/reset-password';
import { User } from '../../models/user';

export interface UserResetConfirmPasswordCreate$XWwwFormUrlencoded$Params {
      body: ResetPassword
}

export function userResetConfirmPasswordCreate$XWwwFormUrlencoded(http: HttpClient, rootUrl: string, params: UserResetConfirmPasswordCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
  const rb = new RequestBuilder(rootUrl, userResetConfirmPasswordCreate$XWwwFormUrlencoded.PATH, 'post');
  if (params) {
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

userResetConfirmPasswordCreate$XWwwFormUrlencoded.PATH = '/api/user/reset_confirm_password/';
