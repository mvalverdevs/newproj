/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RecipeImage } from '../../models/recipe-image';

export interface RecipeImageCreate$FormData$Params {
      body?: RecipeImage
}

export function recipeImageCreate$FormData(http: HttpClient, rootUrl: string, params?: RecipeImageCreate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeImage>> {
  const rb = new RequestBuilder(rootUrl, recipeImageCreate$FormData.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<RecipeImage>;
    })
  );
}

recipeImageCreate$FormData.PATH = '/api/recipe_image/';
