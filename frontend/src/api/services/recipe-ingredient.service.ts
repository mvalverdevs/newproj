/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { PaginatedRecipeIngredientList } from '../models/paginated-recipe-ingredient-list';
import { RecipeIngredient } from '../models/recipe-ingredient';
import { recipeIngredientCreate$FormData } from '../fn/recipe-ingredient/recipe-ingredient-create-form-data';
import { RecipeIngredientCreate$FormData$Params } from '../fn/recipe-ingredient/recipe-ingredient-create-form-data';
import { recipeIngredientCreate$Json } from '../fn/recipe-ingredient/recipe-ingredient-create-json';
import { RecipeIngredientCreate$Json$Params } from '../fn/recipe-ingredient/recipe-ingredient-create-json';
import { recipeIngredientCreate$XWwwFormUrlencoded } from '../fn/recipe-ingredient/recipe-ingredient-create-x-www-form-urlencoded';
import { RecipeIngredientCreate$XWwwFormUrlencoded$Params } from '../fn/recipe-ingredient/recipe-ingredient-create-x-www-form-urlencoded';
import { recipeIngredientDestroy } from '../fn/recipe-ingredient/recipe-ingredient-destroy';
import { RecipeIngredientDestroy$Params } from '../fn/recipe-ingredient/recipe-ingredient-destroy';
import { recipeIngredientList } from '../fn/recipe-ingredient/recipe-ingredient-list';
import { RecipeIngredientList$Params } from '../fn/recipe-ingredient/recipe-ingredient-list';
import { recipeIngredientPartialUpdate$FormData } from '../fn/recipe-ingredient/recipe-ingredient-partial-update-form-data';
import { RecipeIngredientPartialUpdate$FormData$Params } from '../fn/recipe-ingredient/recipe-ingredient-partial-update-form-data';
import { recipeIngredientPartialUpdate$Json } from '../fn/recipe-ingredient/recipe-ingredient-partial-update-json';
import { RecipeIngredientPartialUpdate$Json$Params } from '../fn/recipe-ingredient/recipe-ingredient-partial-update-json';
import { recipeIngredientPartialUpdate$XWwwFormUrlencoded } from '../fn/recipe-ingredient/recipe-ingredient-partial-update-x-www-form-urlencoded';
import { RecipeIngredientPartialUpdate$XWwwFormUrlencoded$Params } from '../fn/recipe-ingredient/recipe-ingredient-partial-update-x-www-form-urlencoded';
import { recipeIngredientRetrieve } from '../fn/recipe-ingredient/recipe-ingredient-retrieve';
import { RecipeIngredientRetrieve$Params } from '../fn/recipe-ingredient/recipe-ingredient-retrieve';
import { recipeIngredientUpdate$FormData } from '../fn/recipe-ingredient/recipe-ingredient-update-form-data';
import { RecipeIngredientUpdate$FormData$Params } from '../fn/recipe-ingredient/recipe-ingredient-update-form-data';
import { recipeIngredientUpdate$Json } from '../fn/recipe-ingredient/recipe-ingredient-update-json';
import { RecipeIngredientUpdate$Json$Params } from '../fn/recipe-ingredient/recipe-ingredient-update-json';
import { recipeIngredientUpdate$XWwwFormUrlencoded } from '../fn/recipe-ingredient/recipe-ingredient-update-x-www-form-urlencoded';
import { RecipeIngredientUpdate$XWwwFormUrlencoded$Params } from '../fn/recipe-ingredient/recipe-ingredient-update-x-www-form-urlencoded';

@Injectable({ providedIn: 'root' })
export class RecipeIngredientService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `recipeIngredientList()` */
  static readonly RecipeIngredientListPath = '/api/recipe_ingredient/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeIngredientList()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeIngredientList$Response(params?: RecipeIngredientList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedRecipeIngredientList>> {
    return recipeIngredientList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeIngredientList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeIngredientList(params?: RecipeIngredientList$Params, context?: HttpContext): Observable<PaginatedRecipeIngredientList> {
    return this.recipeIngredientList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginatedRecipeIngredientList>): PaginatedRecipeIngredientList => r.body)
    );
  }

  /** Path part for operation `recipeIngredientCreate()` */
  static readonly RecipeIngredientCreatePath = '/api/recipe_ingredient/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeIngredientCreate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeIngredientCreate$Json$Response(params: RecipeIngredientCreate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeIngredient>> {
    return recipeIngredientCreate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeIngredientCreate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeIngredientCreate$Json(params: RecipeIngredientCreate$Json$Params, context?: HttpContext): Observable<RecipeIngredient> {
    return this.recipeIngredientCreate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeIngredient>): RecipeIngredient => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeIngredientCreate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeIngredientCreate$XWwwFormUrlencoded$Response(params: RecipeIngredientCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeIngredient>> {
    return recipeIngredientCreate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeIngredientCreate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeIngredientCreate$XWwwFormUrlencoded(params: RecipeIngredientCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<RecipeIngredient> {
    return this.recipeIngredientCreate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeIngredient>): RecipeIngredient => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeIngredientCreate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeIngredientCreate$FormData$Response(params: RecipeIngredientCreate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeIngredient>> {
    return recipeIngredientCreate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeIngredientCreate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeIngredientCreate$FormData(params: RecipeIngredientCreate$FormData$Params, context?: HttpContext): Observable<RecipeIngredient> {
    return this.recipeIngredientCreate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeIngredient>): RecipeIngredient => r.body)
    );
  }

  /** Path part for operation `recipeIngredientRetrieve()` */
  static readonly RecipeIngredientRetrievePath = '/api/recipe_ingredient/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeIngredientRetrieve()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeIngredientRetrieve$Response(params: RecipeIngredientRetrieve$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeIngredient>> {
    return recipeIngredientRetrieve(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeIngredientRetrieve$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeIngredientRetrieve(params: RecipeIngredientRetrieve$Params, context?: HttpContext): Observable<RecipeIngredient> {
    return this.recipeIngredientRetrieve$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeIngredient>): RecipeIngredient => r.body)
    );
  }

  /** Path part for operation `recipeIngredientUpdate()` */
  static readonly RecipeIngredientUpdatePath = '/api/recipe_ingredient/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeIngredientUpdate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeIngredientUpdate$Json$Response(params: RecipeIngredientUpdate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeIngredient>> {
    return recipeIngredientUpdate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeIngredientUpdate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeIngredientUpdate$Json(params: RecipeIngredientUpdate$Json$Params, context?: HttpContext): Observable<RecipeIngredient> {
    return this.recipeIngredientUpdate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeIngredient>): RecipeIngredient => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeIngredientUpdate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeIngredientUpdate$XWwwFormUrlencoded$Response(params: RecipeIngredientUpdate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeIngredient>> {
    return recipeIngredientUpdate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeIngredientUpdate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeIngredientUpdate$XWwwFormUrlencoded(params: RecipeIngredientUpdate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<RecipeIngredient> {
    return this.recipeIngredientUpdate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeIngredient>): RecipeIngredient => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeIngredientUpdate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeIngredientUpdate$FormData$Response(params: RecipeIngredientUpdate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeIngredient>> {
    return recipeIngredientUpdate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeIngredientUpdate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeIngredientUpdate$FormData(params: RecipeIngredientUpdate$FormData$Params, context?: HttpContext): Observable<RecipeIngredient> {
    return this.recipeIngredientUpdate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeIngredient>): RecipeIngredient => r.body)
    );
  }

  /** Path part for operation `recipeIngredientDestroy()` */
  static readonly RecipeIngredientDestroyPath = '/api/recipe_ingredient/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeIngredientDestroy()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeIngredientDestroy$Response(params: RecipeIngredientDestroy$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return recipeIngredientDestroy(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeIngredientDestroy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeIngredientDestroy(params: RecipeIngredientDestroy$Params, context?: HttpContext): Observable<void> {
    return this.recipeIngredientDestroy$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `recipeIngredientPartialUpdate()` */
  static readonly RecipeIngredientPartialUpdatePath = '/api/recipe_ingredient/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeIngredientPartialUpdate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeIngredientPartialUpdate$Json$Response(params: RecipeIngredientPartialUpdate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeIngredient>> {
    return recipeIngredientPartialUpdate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeIngredientPartialUpdate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeIngredientPartialUpdate$Json(params: RecipeIngredientPartialUpdate$Json$Params, context?: HttpContext): Observable<RecipeIngredient> {
    return this.recipeIngredientPartialUpdate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeIngredient>): RecipeIngredient => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeIngredientPartialUpdate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeIngredientPartialUpdate$XWwwFormUrlencoded$Response(params: RecipeIngredientPartialUpdate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeIngredient>> {
    return recipeIngredientPartialUpdate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeIngredientPartialUpdate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeIngredientPartialUpdate$XWwwFormUrlencoded(params: RecipeIngredientPartialUpdate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<RecipeIngredient> {
    return this.recipeIngredientPartialUpdate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeIngredient>): RecipeIngredient => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeIngredientPartialUpdate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeIngredientPartialUpdate$FormData$Response(params: RecipeIngredientPartialUpdate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeIngredient>> {
    return recipeIngredientPartialUpdate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeIngredientPartialUpdate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeIngredientPartialUpdate$FormData(params: RecipeIngredientPartialUpdate$FormData$Params, context?: HttpContext): Observable<RecipeIngredient> {
    return this.recipeIngredientPartialUpdate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeIngredient>): RecipeIngredient => r.body)
    );
  }

}
