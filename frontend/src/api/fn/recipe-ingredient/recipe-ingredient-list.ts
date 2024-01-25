/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PaginatedRecipeIngredientList } from '../../models/paginated-recipe-ingredient-list';

export interface RecipeIngredientList$Params {

/**
 * List of nested objects
 */
  expand?: string;

/**
 * Number of results to return per page.
 */
  limit?: number;

/**
 * The initial index from which to return the results.
 */
  offset?: number;

/**
 * Which field to use when ordering the results.
 */
  ordering?: string;

/**
 * A search term.
 */
  search?: string;
}

export function recipeIngredientList(http: HttpClient, rootUrl: string, params?: RecipeIngredientList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedRecipeIngredientList>> {
  const rb = new RequestBuilder(rootUrl, recipeIngredientList.PATH, 'get');
  if (params) {
    rb.query('expand', params.expand, {});
    rb.query('limit', params.limit, {});
    rb.query('offset', params.offset, {});
    rb.query('ordering', params.ordering, {});
    rb.query('search', params.search, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PaginatedRecipeIngredientList>;
    })
  );
}

recipeIngredientList.PATH = '/api/recipe_ingredient/';
