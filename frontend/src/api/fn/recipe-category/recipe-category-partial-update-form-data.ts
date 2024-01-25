/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PatchedRecipeCategory } from '../../models/patched-recipe-category';
import { RecipeCategory } from '../../models/recipe-category';

export interface RecipeCategoryPartialUpdate$FormData$Params {

/**
 * List of nested objects
 */
  expand?: string;

/**
 * A unique integer value identifying this recipe category.
 */
  id: number;
      body?: PatchedRecipeCategory
}

export function recipeCategoryPartialUpdate$FormData(http: HttpClient, rootUrl: string, params: RecipeCategoryPartialUpdate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeCategory>> {
  const rb = new RequestBuilder(rootUrl, recipeCategoryPartialUpdate$FormData.PATH, 'patch');
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
      return r as StrictHttpResponse<RecipeCategory>;
    })
  );
}

recipeCategoryPartialUpdate$FormData.PATH = '/api/recipe_category/{id}/';
