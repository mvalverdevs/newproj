/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RecipeIngredient } from '../../models/recipe-ingredient';

export interface RecipeIngredientRetrieve$Params {

/**
 * List of nested objects
 */
  expand?: string;

/**
 * A unique integer value identifying this recipe ingredient.
 */
  id: number;
}

export function recipeIngredientRetrieve(http: HttpClient, rootUrl: string, params: RecipeIngredientRetrieve$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeIngredient>> {
  const rb = new RequestBuilder(rootUrl, recipeIngredientRetrieve.PATH, 'get');
  if (params) {
    rb.query('expand', params.expand, {});
    rb.path('id', params.id, {});
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

recipeIngredientRetrieve.PATH = '/api/recipe_ingredient/{id}/';
