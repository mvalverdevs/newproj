/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { PaginatedRecipeCategoryList } from '../models/paginated-recipe-category-list';
import { RecipeCategory } from '../models/recipe-category';
import { recipeCategoryCreate$FormData } from '../fn/recipe-category/recipe-category-create-form-data';
import { RecipeCategoryCreate$FormData$Params } from '../fn/recipe-category/recipe-category-create-form-data';
import { recipeCategoryCreate$Json } from '../fn/recipe-category/recipe-category-create-json';
import { RecipeCategoryCreate$Json$Params } from '../fn/recipe-category/recipe-category-create-json';
import { recipeCategoryCreate$XWwwFormUrlencoded } from '../fn/recipe-category/recipe-category-create-x-www-form-urlencoded';
import { RecipeCategoryCreate$XWwwFormUrlencoded$Params } from '../fn/recipe-category/recipe-category-create-x-www-form-urlencoded';
import { recipeCategoryDestroy } from '../fn/recipe-category/recipe-category-destroy';
import { RecipeCategoryDestroy$Params } from '../fn/recipe-category/recipe-category-destroy';
import { recipeCategoryList } from '../fn/recipe-category/recipe-category-list';
import { RecipeCategoryList$Params } from '../fn/recipe-category/recipe-category-list';
import { recipeCategoryPartialUpdate$FormData } from '../fn/recipe-category/recipe-category-partial-update-form-data';
import { RecipeCategoryPartialUpdate$FormData$Params } from '../fn/recipe-category/recipe-category-partial-update-form-data';
import { recipeCategoryPartialUpdate$Json } from '../fn/recipe-category/recipe-category-partial-update-json';
import { RecipeCategoryPartialUpdate$Json$Params } from '../fn/recipe-category/recipe-category-partial-update-json';
import { recipeCategoryPartialUpdate$XWwwFormUrlencoded } from '../fn/recipe-category/recipe-category-partial-update-x-www-form-urlencoded';
import { RecipeCategoryPartialUpdate$XWwwFormUrlencoded$Params } from '../fn/recipe-category/recipe-category-partial-update-x-www-form-urlencoded';
import { recipeCategoryRetrieve } from '../fn/recipe-category/recipe-category-retrieve';
import { RecipeCategoryRetrieve$Params } from '../fn/recipe-category/recipe-category-retrieve';
import { recipeCategoryUpdate$FormData } from '../fn/recipe-category/recipe-category-update-form-data';
import { RecipeCategoryUpdate$FormData$Params } from '../fn/recipe-category/recipe-category-update-form-data';
import { recipeCategoryUpdate$Json } from '../fn/recipe-category/recipe-category-update-json';
import { RecipeCategoryUpdate$Json$Params } from '../fn/recipe-category/recipe-category-update-json';
import { recipeCategoryUpdate$XWwwFormUrlencoded } from '../fn/recipe-category/recipe-category-update-x-www-form-urlencoded';
import { RecipeCategoryUpdate$XWwwFormUrlencoded$Params } from '../fn/recipe-category/recipe-category-update-x-www-form-urlencoded';

@Injectable({ providedIn: 'root' })
export class RecipeCategoryService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `recipeCategoryList()` */
  static readonly RecipeCategoryListPath = '/api/recipe_category/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeCategoryList()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeCategoryList$Response(params?: RecipeCategoryList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedRecipeCategoryList>> {
    return recipeCategoryList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeCategoryList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeCategoryList(params?: RecipeCategoryList$Params, context?: HttpContext): Observable<PaginatedRecipeCategoryList> {
    return this.recipeCategoryList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginatedRecipeCategoryList>): PaginatedRecipeCategoryList => r.body)
    );
  }

  /** Path part for operation `recipeCategoryCreate()` */
  static readonly RecipeCategoryCreatePath = '/api/recipe_category/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeCategoryCreate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeCategoryCreate$Json$Response(params: RecipeCategoryCreate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeCategory>> {
    return recipeCategoryCreate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeCategoryCreate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeCategoryCreate$Json(params: RecipeCategoryCreate$Json$Params, context?: HttpContext): Observable<RecipeCategory> {
    return this.recipeCategoryCreate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeCategory>): RecipeCategory => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeCategoryCreate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeCategoryCreate$XWwwFormUrlencoded$Response(params: RecipeCategoryCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeCategory>> {
    return recipeCategoryCreate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeCategoryCreate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeCategoryCreate$XWwwFormUrlencoded(params: RecipeCategoryCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<RecipeCategory> {
    return this.recipeCategoryCreate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeCategory>): RecipeCategory => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeCategoryCreate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeCategoryCreate$FormData$Response(params: RecipeCategoryCreate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeCategory>> {
    return recipeCategoryCreate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeCategoryCreate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeCategoryCreate$FormData(params: RecipeCategoryCreate$FormData$Params, context?: HttpContext): Observable<RecipeCategory> {
    return this.recipeCategoryCreate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeCategory>): RecipeCategory => r.body)
    );
  }

  /** Path part for operation `recipeCategoryRetrieve()` */
  static readonly RecipeCategoryRetrievePath = '/api/recipe_category/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeCategoryRetrieve()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeCategoryRetrieve$Response(params: RecipeCategoryRetrieve$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeCategory>> {
    return recipeCategoryRetrieve(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeCategoryRetrieve$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeCategoryRetrieve(params: RecipeCategoryRetrieve$Params, context?: HttpContext): Observable<RecipeCategory> {
    return this.recipeCategoryRetrieve$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeCategory>): RecipeCategory => r.body)
    );
  }

  /** Path part for operation `recipeCategoryUpdate()` */
  static readonly RecipeCategoryUpdatePath = '/api/recipe_category/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeCategoryUpdate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeCategoryUpdate$Json$Response(params: RecipeCategoryUpdate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeCategory>> {
    return recipeCategoryUpdate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeCategoryUpdate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeCategoryUpdate$Json(params: RecipeCategoryUpdate$Json$Params, context?: HttpContext): Observable<RecipeCategory> {
    return this.recipeCategoryUpdate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeCategory>): RecipeCategory => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeCategoryUpdate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeCategoryUpdate$XWwwFormUrlencoded$Response(params: RecipeCategoryUpdate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeCategory>> {
    return recipeCategoryUpdate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeCategoryUpdate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeCategoryUpdate$XWwwFormUrlencoded(params: RecipeCategoryUpdate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<RecipeCategory> {
    return this.recipeCategoryUpdate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeCategory>): RecipeCategory => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeCategoryUpdate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeCategoryUpdate$FormData$Response(params: RecipeCategoryUpdate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeCategory>> {
    return recipeCategoryUpdate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeCategoryUpdate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeCategoryUpdate$FormData(params: RecipeCategoryUpdate$FormData$Params, context?: HttpContext): Observable<RecipeCategory> {
    return this.recipeCategoryUpdate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeCategory>): RecipeCategory => r.body)
    );
  }

  /** Path part for operation `recipeCategoryDestroy()` */
  static readonly RecipeCategoryDestroyPath = '/api/recipe_category/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeCategoryDestroy()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeCategoryDestroy$Response(params: RecipeCategoryDestroy$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return recipeCategoryDestroy(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeCategoryDestroy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeCategoryDestroy(params: RecipeCategoryDestroy$Params, context?: HttpContext): Observable<void> {
    return this.recipeCategoryDestroy$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `recipeCategoryPartialUpdate()` */
  static readonly RecipeCategoryPartialUpdatePath = '/api/recipe_category/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeCategoryPartialUpdate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeCategoryPartialUpdate$Json$Response(params: RecipeCategoryPartialUpdate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeCategory>> {
    return recipeCategoryPartialUpdate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeCategoryPartialUpdate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeCategoryPartialUpdate$Json(params: RecipeCategoryPartialUpdate$Json$Params, context?: HttpContext): Observable<RecipeCategory> {
    return this.recipeCategoryPartialUpdate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeCategory>): RecipeCategory => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeCategoryPartialUpdate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeCategoryPartialUpdate$XWwwFormUrlencoded$Response(params: RecipeCategoryPartialUpdate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeCategory>> {
    return recipeCategoryPartialUpdate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeCategoryPartialUpdate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeCategoryPartialUpdate$XWwwFormUrlencoded(params: RecipeCategoryPartialUpdate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<RecipeCategory> {
    return this.recipeCategoryPartialUpdate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeCategory>): RecipeCategory => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeCategoryPartialUpdate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeCategoryPartialUpdate$FormData$Response(params: RecipeCategoryPartialUpdate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeCategory>> {
    return recipeCategoryPartialUpdate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeCategoryPartialUpdate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeCategoryPartialUpdate$FormData(params: RecipeCategoryPartialUpdate$FormData$Params, context?: HttpContext): Observable<RecipeCategory> {
    return this.recipeCategoryPartialUpdate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeCategory>): RecipeCategory => r.body)
    );
  }

}
