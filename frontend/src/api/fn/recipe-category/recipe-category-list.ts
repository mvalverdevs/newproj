/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PaginatedRecipeCategoryList } from '../../models/paginated-recipe-category-list';

export interface RecipeCategoryList$Params {

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

export function recipeCategoryList(http: HttpClient, rootUrl: string, params?: RecipeCategoryList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedRecipeCategoryList>> {
  const rb = new RequestBuilder(rootUrl, recipeCategoryList.PATH, 'get');
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
      return r as StrictHttpResponse<PaginatedRecipeCategoryList>;
    })
  );
}

recipeCategoryList.PATH = '/api/recipe_category/';
