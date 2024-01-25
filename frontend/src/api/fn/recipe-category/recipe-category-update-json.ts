/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RecipeCategory } from '../../models/recipe-category';

export interface RecipeCategoryUpdate$Json$Params {

/**
 * List of nested objects
 */
  expand?: string;

/**
 * A unique integer value identifying this recipe category.
 */
  id: number;
      body: RecipeCategory
}

export function recipeCategoryUpdate$Json(http: HttpClient, rootUrl: string, params: RecipeCategoryUpdate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeCategory>> {
  const rb = new RequestBuilder(rootUrl, recipeCategoryUpdate$Json.PATH, 'put');
  if (params) {
    rb.query('expand', params.expand, {});
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<RecipeCategory>;
    })
  );
}

recipeCategoryUpdate$Json.PATH = '/api/recipe_category/{id}/';
