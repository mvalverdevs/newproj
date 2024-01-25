/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RecipeIngredient } from '../../models/recipe-ingredient';

export interface RecipeIngredientCreate$Json$Params {

/**
 * List of nested objects
 */
  expand?: string;
      body: RecipeIngredient
}

export function recipeIngredientCreate$Json(http: HttpClient, rootUrl: string, params: RecipeIngredientCreate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeIngredient>> {
  const rb = new RequestBuilder(rootUrl, recipeIngredientCreate$Json.PATH, 'post');
  if (params) {
    rb.query('expand', params.expand, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<RecipeIngredient>;
    })
  );
}

recipeIngredientCreate$Json.PATH = '/api/recipe_ingredient/';
