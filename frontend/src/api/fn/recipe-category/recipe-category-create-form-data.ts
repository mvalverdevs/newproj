/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { RecipeCategory } from '../../models/recipe-category';

export interface RecipeCategoryCreate$FormData$Params {

/**
 * List of nested objects
 */
  expand?: string;
      body: RecipeCategory
}

export function recipeCategoryCreate$FormData(http: HttpClient, rootUrl: string, params: RecipeCategoryCreate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeCategory>> {
  const rb = new RequestBuilder(rootUrl, recipeCategoryCreate$FormData.PATH, 'post');
  if (params) {
    rb.query('expand', params.expand, {});
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

recipeCategoryCreate$FormData.PATH = '/api/recipe_category/';
