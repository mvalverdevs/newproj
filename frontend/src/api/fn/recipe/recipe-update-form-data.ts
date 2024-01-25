/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Recipe } from '../../models/recipe';

export interface RecipeUpdate$FormData$Params {

/**
 * List of nested objects
 */
  expand?: string;

/**
 * A unique integer value identifying this recipe.
 */
  id: number;
      body: Recipe
}

export function recipeUpdate$FormData(http: HttpClient, rootUrl: string, params: RecipeUpdate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<Recipe>> {
  const rb = new RequestBuilder(rootUrl, recipeUpdate$FormData.PATH, 'put');
  if (params) {
    rb.query('expand', params.expand, {});
    rb.path('id', params.id, {});
    rb.body(params.body, 'multipart/form-data');
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

recipeUpdate$FormData.PATH = '/api/recipe/{id}/';
