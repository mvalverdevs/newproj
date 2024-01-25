/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { RecipeImage } from '../models/recipe-image';
import { recipeImageCreate$FormData } from '../fn/recipe-image/recipe-image-create-form-data';
import { RecipeImageCreate$FormData$Params } from '../fn/recipe-image/recipe-image-create-form-data';
import { recipeImageCreate$Json } from '../fn/recipe-image/recipe-image-create-json';
import { RecipeImageCreate$Json$Params } from '../fn/recipe-image/recipe-image-create-json';
import { recipeImageCreate$XWwwFormUrlencoded } from '../fn/recipe-image/recipe-image-create-x-www-form-urlencoded';
import { RecipeImageCreate$XWwwFormUrlencoded$Params } from '../fn/recipe-image/recipe-image-create-x-www-form-urlencoded';
import { recipeImageDestroy } from '../fn/recipe-image/recipe-image-destroy';
import { RecipeImageDestroy$Params } from '../fn/recipe-image/recipe-image-destroy';

@Injectable({ providedIn: 'root' })
export class RecipeImageService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `recipeImageCreate()` */
  static readonly RecipeImageCreatePath = '/api/recipe_image/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeImageCreate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeImageCreate$Json$Response(params?: RecipeImageCreate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeImage>> {
    return recipeImageCreate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeImageCreate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  recipeImageCreate$Json(params?: RecipeImageCreate$Json$Params, context?: HttpContext): Observable<RecipeImage> {
    return this.recipeImageCreate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeImage>): RecipeImage => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeImageCreate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeImageCreate$XWwwFormUrlencoded$Response(params?: RecipeImageCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeImage>> {
    return recipeImageCreate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeImageCreate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  recipeImageCreate$XWwwFormUrlencoded(params?: RecipeImageCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<RecipeImage> {
    return this.recipeImageCreate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeImage>): RecipeImage => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeImageCreate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeImageCreate$FormData$Response(params?: RecipeImageCreate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<RecipeImage>> {
    return recipeImageCreate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeImageCreate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  recipeImageCreate$FormData(params?: RecipeImageCreate$FormData$Params, context?: HttpContext): Observable<RecipeImage> {
    return this.recipeImageCreate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<RecipeImage>): RecipeImage => r.body)
    );
  }

  /** Path part for operation `recipeImageDestroy()` */
  static readonly RecipeImageDestroyPath = '/api/recipe_image/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recipeImageDestroy()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeImageDestroy$Response(params: RecipeImageDestroy$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return recipeImageDestroy(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `recipeImageDestroy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  recipeImageDestroy(params: RecipeImageDestroy$Params, context?: HttpContext): Observable<void> {
    return this.recipeImageDestroy$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
