/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RecipeImage } from '../../models/recipe-image';

export interface RecipeImageCreate$Json$Params {
      body?: RecipeImage
}

export function recipeImageCreate$Json(http: HttpClient, rootUrl: string, params?: RecipeImageCreate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeImage>> {
  const rb = new RequestBuilder(rootUrl, recipeImageCreate$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

recipeImageCreate$Json.PATH = '/api/recipe_image/';
