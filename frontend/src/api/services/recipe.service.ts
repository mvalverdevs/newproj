/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { PaginatedRecipeList } from '../models/paginated-recipe-list';
import { Recipe } from '../models/recipe';
import { recipeCreate$FormData } from '../fn/recipe/recipe-create-form-data';
import { RecipeCreate$FormData$Params } from '../fn/recipe/recipe-create-form-data';
import { recipeCreate$Json } from '../fn/recipe/recipe-create-json';
import { RecipeCreate$Json$Params } from '../fn/recipe/recipe-create-json';
import { recipeCreate$XWwwFormUrlencoded } from '../fn/recipe/recipe-create-x-www-form-urlencoded';
import { RecipeCreate$XWwwFormUrlencoded$Params } from '../fn/recipe/recipe-create-x-www-form-urlencoded';
import { recipeDestroy } from '../fn/recipe/recipe-destroy';
import { RecipeDestroy$Params } from '../fn/recipe/recipe-destroy';
import { recipeList } from '../fn/recipe/recipe-list';
import { RecipeList$Params } from '../fn/recipe/recipe-list';
import { recipePartialUpdate$FormData } from '../fn/recipe/recipe-partial-update-form-data';
import { RecipePartialUpdate$FormData$Params } from '../fn/recipe/recipe-partial-update-form-data';
import { recipePartialUpdate$Json } from '../fn/recipe/recipe-partial-update-json';
import { RecipePartialUpdate$Json$Params } from '../fn/recipe/recipe-partial-update-json';
import { recipePartialUpdate$XWwwFormUrlencoded } from '../fn/recipe/recipe-partial-update-x-www-form-urlencoded';
import { RecipePartialUpdate$XWwwFormUrlencoded$Params } from '../fn/recipe/recipe-partial-update-x-www-form-urlencoded';
import { recipeRetrieve } from '../fn/recipe/recipe-retrieve';
import { RecipeRetrieve$Params } from '../fn/recipe/recipe-retrieve';
import { recipeUpdate$FormData } from '../fn/recipe/recipe-update-form-data';
import { RecipeUpdate$FormData$Params } from '../fn/recipe/recipe-update-form-data';
import { recipeUpdate$Json } from '../fn/recipe/recipe-update-json';
import { RecipeUpdate$Json$Params } from '../fn/recipe/recipe-update-json';
import { recipeUpdate$XWwwFormUrlencoded } from '../fn/recipe/recipe-update-x-www-form-urlencoded';
import { RecipeUpdate$XWwwFormUrlencoded$Params } from '../fn/recipe/recipe-update-x-www-form-urlencoded';

@Injectable({ providedIn: 'root' })
export class RecipeService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `recipeList()` */
  static readonly RecipeListPath = '/api/recipe/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeList()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeList$Response(params?: RecipeList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedRecipeList>> {
    return recipeList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeList(params?: RecipeList$Params, context?: HttpContext): Observable<PaginatedRecipeList> {
    return this.recipeList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginatedRecipeList>): PaginatedRecipeList => r.body)
    );
  }

  /** Path part for operation `recipeCreate()` */
  static readonly RecipeCreatePath = '/api/recipe/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeCreate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeCreate$Json$Response(params: RecipeCreate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Recipe>> {
    return recipeCreate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeCreate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeCreate$Json(params: RecipeCreate$Json$Params, context?: HttpContext): Observable<Recipe> {
    return this.recipeCreate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Recipe>): Recipe => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeCreate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeCreate$XWwwFormUrlencoded$Response(params: RecipeCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<Recipe>> {
    return recipeCreate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeCreate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeCreate$XWwwFormUrlencoded(params: RecipeCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<Recipe> {
    return this.recipeCreate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<Recipe>): Recipe => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeCreate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeCreate$FormData$Response(params: RecipeCreate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<Recipe>> {
    return recipeCreate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeCreate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeCreate$FormData(params: RecipeCreate$FormData$Params, context?: HttpContext): Observable<Recipe> {
    return this.recipeCreate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<Recipe>): Recipe => r.body)
    );
  }

  /** Path part for operation `recipeRetrieve()` */
  static readonly RecipeRetrievePath = '/api/recipe/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeRetrieve()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeRetrieve$Response(params: RecipeRetrieve$Params, context?: HttpContext): Observable<StrictHttpResponse<Recipe>> {
    return recipeRetrieve(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeRetrieve$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeRetrieve(params: RecipeRetrieve$Params, context?: HttpContext): Observable<Recipe> {
    return this.recipeRetrieve$Response(params, context).pipe(
      map((r: StrictHttpResponse<Recipe>): Recipe => r.body)
    );
  }

  /** Path part for operation `recipeUpdate()` */
  static readonly RecipeUpdatePath = '/api/recipe/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeUpdate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeUpdate$Json$Response(params: RecipeUpdate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Recipe>> {
    return recipeUpdate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeUpdate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeUpdate$Json(params: RecipeUpdate$Json$Params, context?: HttpContext): Observable<Recipe> {
    return this.recipeUpdate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Recipe>): Recipe => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeUpdate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeUpdate$XWwwFormUrlencoded$Response(params: RecipeUpdate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<Recipe>> {
    return recipeUpdate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeUpdate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeUpdate$XWwwFormUrlencoded(params: RecipeUpdate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<Recipe> {
    return this.recipeUpdate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<Recipe>): Recipe => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeUpdate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeUpdate$FormData$Response(params: RecipeUpdate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<Recipe>> {
    return recipeUpdate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeUpdate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeUpdate$FormData(params: RecipeUpdate$FormData$Params, context?: HttpContext): Observable<Recipe> {
    return this.recipeUpdate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<Recipe>): Recipe => r.body)
    );
  }

  /** Path part for operation `recipeDestroy()` */
  static readonly RecipeDestroyPath = '/api/recipe/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeDestroy()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeDestroy$Response(params: RecipeDestroy$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return recipeDestroy(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeDestroy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeDestroy(params: RecipeDestroy$Params, context?: HttpContext): Observable<void> {
    return this.recipeDestroy$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `recipePartialUpdate()` */
  static readonly RecipePartialUpdatePath = '/api/recipe/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipePartialUpdate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipePartialUpdate$Json$Response(params: RecipePartialUpdate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Recipe>> {
    return recipePartialUpdate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipePartialUpdate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipePartialUpdate$Json(params: RecipePartialUpdate$Json$Params, context?: HttpContext): Observable<Recipe> {
    return this.recipePartialUpdate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Recipe>): Recipe => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipePartialUpdate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipePartialUpdate$XWwwFormUrlencoded$Response(params: RecipePartialUpdate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<Recipe>> {
    return recipePartialUpdate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipePartialUpdate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipePartialUpdate$XWwwFormUrlencoded(params: RecipePartialUpdate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<Recipe> {
    return this.recipePartialUpdate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<Recipe>): Recipe => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipePartialUpdate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipePartialUpdate$FormData$Response(params: RecipePartialUpdate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<Recipe>> {
    return recipePartialUpdate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipePartialUpdate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipePartialUpdate$FormData(params: RecipePartialUpdate$FormData$Params, context?: HttpContext): Observable<Recipe> {
    return this.recipePartialUpdate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<Recipe>): Recipe => r.body)
    );
  }

}
