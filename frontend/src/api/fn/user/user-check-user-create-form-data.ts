/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CheckUser } from '../../models/check-user';
import { CheckUserResponse } from '../../models/check-user-response';

export interface UserCheckUserCreate$FormData$Params {
      body: CheckUser
}

export function userCheckUserCreate$FormData(http: HttpClient, rootUrl: string, params: UserCheckUserCreate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<CheckUserResponse>> {
  const rb = new RequestBuilder(rootUrl, userCheckUserCreate$FormData.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
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

userCheckUserCreate$FormData.PATH = '/api/user/check_user/';
