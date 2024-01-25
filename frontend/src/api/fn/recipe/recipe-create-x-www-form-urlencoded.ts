/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Recipe } from '../../models/recipe';

export interface RecipeCreate$XWwwFormUrlencoded$Params {

/**
 * List of nested objects
 */
  expand?: string;
      body: Recipe
}

export function recipeCreate$XWwwFormUrlencoded(http: HttpClient, rootUrl: string, params: RecipeCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<Recipe>> {
  const rb = new RequestBuilder(rootUrl, recipeCreate$XWwwFormUrlencoded.PATH, 'post');
  if (params) {
    rb.query('expand', params.expand, {});
    rb.body(params.body, 'application/x-www-form-urlencoded');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Recipe>;
    })
  );
}

recipeCreate$XWwwFormUrlencoded.PATH = '/api/recipe/';
