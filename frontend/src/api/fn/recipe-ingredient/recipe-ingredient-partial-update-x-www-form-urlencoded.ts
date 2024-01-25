/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PatchedRecipeIngredient } from '../../models/patched-recipe-ingredient';
import { RecipeIngredient } from '../../models/recipe-ingredient';

export interface RecipeIngredientPartialUpdate$XWwwFormUrlencoded$Params {

/**
 * List of nested objects
 */
  expand?: string;

/**
 * A unique integer value identifying this recipe ingredient.
 */
  id: number;
      body?: PatchedRecipeIngredient
}

export function recipeIngredientPartialUpdate$XWwwFormUrlencoded(http: HttpClient, rootUrl: string, params: RecipeIngredientPartialUpdate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeIngredient>> {
  const rb = new RequestBuilder(rootUrl, recipeIngredientPartialUpdate$XWwwFormUrlencoded.PATH, 'patch');
  if (params) {
    rb.query('expand', params.expand, {});
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/x-www-form-urlencoded');
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

recipeIngredientPartialUpdate$XWwwFormUrlencoded.PATH = '/api/recipe_ingredient/{id}/';
