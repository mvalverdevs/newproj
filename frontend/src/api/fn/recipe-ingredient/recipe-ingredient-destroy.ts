/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface RecipeIngredientDestroy$Params {

/**
 * List of nested objects
 */
  expand?: string;

/**
 * A unique integer value identifying this recipe ingredient.
 */
  id: number;
}

export function recipeIngredientDestroy(http: HttpClient, rootUrl: string, params: RecipeIngredientDestroy$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  const rb = new RequestBuilder(rootUrl, recipeIngredientDestroy.PATH, 'delete');
  if (params) {
    rb.query('expand', params.expand, {});
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
    })
  );
}

recipeIngredientDestroy.PATH = '/api/recipe_ingredient/{id}/';
