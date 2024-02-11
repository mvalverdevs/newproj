/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CheckUserResponse } from '../models/check-user-response';
import { PaginatedUserList } from '../models/paginated-user-list';
import { Permission } from '../models/permission';
import { User } from '../models/user';
import { userCheckEmailCreate$FormData } from '../fn/user/user-check-email-create-form-data';
import { UserCheckEmailCreate$FormData$Params } from '../fn/user/user-check-email-create-form-data';
import { userCheckEmailCreate$Json } from '../fn/user/user-check-email-create-json';
import { UserCheckEmailCreate$Json$Params } from '../fn/user/user-check-email-create-json';
import { userCheckEmailCreate$XWwwFormUrlencoded } from '../fn/user/user-check-email-create-x-www-form-urlencoded';
import { UserCheckEmailCreate$XWwwFormUrlencoded$Params } from '../fn/user/user-check-email-create-x-www-form-urlencoded';
import { userCheckUsernameCreate$FormData } from '../fn/user/user-check-username-create-form-data';
import { UserCheckUsernameCreate$FormData$Params } from '../fn/user/user-check-username-create-form-data';
import { userCheckUsernameCreate$Json } from '../fn/user/user-check-username-create-json';
import { UserCheckUsernameCreate$Json$Params } from '../fn/user/user-check-username-create-json';
import { userCheckUsernameCreate$XWwwFormUrlencoded } from '../fn/user/user-check-username-create-x-www-form-urlencoded';
import { UserCheckUsernameCreate$XWwwFormUrlencoded$Params } from '../fn/user/user-check-username-create-x-www-form-urlencoded';
import { userCreate$FormData } from '../fn/user/user-create-form-data';
import { UserCreate$FormData$Params } from '../fn/user/user-create-form-data';
import { userCreate$Json } from '../fn/user/user-create-json';
import { UserCreate$Json$Params } from '../fn/user/user-create-json';
import { userCreate$XWwwFormUrlencoded } from '../fn/user/user-create-x-www-form-urlencoded';
import { UserCreate$XWwwFormUrlencoded$Params } from '../fn/user/user-create-x-www-form-urlencoded';
import { userCurrentRetrieve } from '../fn/user/user-current-retrieve';
import { UserCurrentRetrieve$Params } from '../fn/user/user-current-retrieve';
import { userDestroy } from '../fn/user/user-destroy';
import { UserDestroy$Params } from '../fn/user/user-destroy';
import { userList } from '../fn/user/user-list';
import { UserList$Params } from '../fn/user/user-list';
import { UserLogin } from '../models/user-login';
import { userLoginCreate$FormData } from '../fn/user/user-login-create-form-data';
import { UserLoginCreate$FormData$Params } from '../fn/user/user-login-create-form-data';
import { userLoginCreate$Json } from '../fn/user/user-login-create-json';
import { UserLoginCreate$Json$Params } from '../fn/user/user-login-create-json';
import { userLoginCreate$XWwwFormUrlencoded } from '../fn/user/user-login-create-x-www-form-urlencoded';
import { UserLoginCreate$XWwwFormUrlencoded$Params } from '../fn/user/user-login-create-x-www-form-urlencoded';
import { userLogoutCreate$FormData } from '../fn/user/user-logout-create-form-data';
import { UserLogoutCreate$FormData$Params } from '../fn/user/user-logout-create-form-data';
import { userLogoutCreate$Json } from '../fn/user/user-logout-create-json';
import { UserLogoutCreate$Json$Params } from '../fn/user/user-logout-create-json';
import { userLogoutCreate$XWwwFormUrlencoded } from '../fn/user/user-logout-create-x-www-form-urlencoded';
import { UserLogoutCreate$XWwwFormUrlencoded$Params } from '../fn/user/user-logout-create-x-www-form-urlencoded';
import { userPartialUpdate$FormData } from '../fn/user/user-partial-update-form-data';
import { UserPartialUpdate$FormData$Params } from '../fn/user/user-partial-update-form-data';
import { userPartialUpdate$Json } from '../fn/user/user-partial-update-json';
import { UserPartialUpdate$Json$Params } from '../fn/user/user-partial-update-json';
import { userPartialUpdate$XWwwFormUrlencoded } from '../fn/user/user-partial-update-x-www-form-urlencoded';
import { UserPartialUpdate$XWwwFormUrlencoded$Params } from '../fn/user/user-partial-update-x-www-form-urlencoded';
import { userPermissionsRetrieve } from '../fn/user/user-permissions-retrieve';
import { UserPermissionsRetrieve$Params } from '../fn/user/user-permissions-retrieve';
import { userResetConfirmPasswordCreate$FormData } from '../fn/user/user-reset-confirm-password-create-form-data';
import { UserResetConfirmPasswordCreate$FormData$Params } from '../fn/user/user-reset-confirm-password-create-form-data';
import { userResetConfirmPasswordCreate$Json } from '../fn/user/user-reset-confirm-password-create-json';
import { UserResetConfirmPasswordCreate$Json$Params } from '../fn/user/user-reset-confirm-password-create-json';
import { userResetConfirmPasswordCreate$XWwwFormUrlencoded } from '../fn/user/user-reset-confirm-password-create-x-www-form-urlencoded';
import { UserResetConfirmPasswordCreate$XWwwFormUrlencoded$Params } from '../fn/user/user-reset-confirm-password-create-x-www-form-urlencoded';
import { userResetPasswordCreate$FormData } from '../fn/user/user-reset-password-create-form-data';
import { UserResetPasswordCreate$FormData$Params } from '../fn/user/user-reset-password-create-form-data';
import { userResetPasswordCreate$Json } from '../fn/user/user-reset-password-create-json';
import { UserResetPasswordCreate$Json$Params } from '../fn/user/user-reset-password-create-json';
import { userResetPasswordCreate$XWwwFormUrlencoded } from '../fn/user/user-reset-password-create-x-www-form-urlencoded';
import { UserResetPasswordCreate$XWwwFormUrlencoded$Params } from '../fn/user/user-reset-password-create-x-www-form-urlencoded';
import { userRetrieve } from '../fn/user/user-retrieve';
import { UserRetrieve$Params } from '../fn/user/user-retrieve';
import { userUpdate$FormData } from '../fn/user/user-update-form-data';
import { UserUpdate$FormData$Params } from '../fn/user/user-update-form-data';
import { userUpdate$Json } from '../fn/user/user-update-json';
import { UserUpdate$Json$Params } from '../fn/user/user-update-json';
import { userUpdate$XWwwFormUrlencoded } from '../fn/user/user-update-x-www-form-urlencoded';
import { UserUpdate$XWwwFormUrlencoded$Params } from '../fn/user/user-update-x-www-form-urlencoded';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `userList()` */
  static readonly UserListPath = '/api/user/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userList()` instead.
   *
   * This method doesn't expect any request body.
   */
  userList$Response(params?: UserList$Params, context?: HttpContext): Observable<StrictHttpResponse<PaginatedUserList>> {
    return userList(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userList(params?: UserList$Params, context?: HttpContext): Observable<PaginatedUserList> {
    return this.userList$Response(params, context).pipe(
      map((r: StrictHttpResponse<PaginatedUserList>): PaginatedUserList => r.body)
    );
  }

  /** Path part for operation `userCreate()` */
  static readonly UserCreatePath = '/api/user/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userCreate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userCreate$Json$Response(params: UserCreate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userCreate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userCreate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userCreate$Json(params: UserCreate$Json$Params, context?: HttpContext): Observable<User> {
    return this.userCreate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userCreate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userCreate$XWwwFormUrlencoded$Response(params: UserCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userCreate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userCreate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userCreate$XWwwFormUrlencoded(params: UserCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<User> {
    return this.userCreate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userCreate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userCreate$FormData$Response(params: UserCreate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userCreate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userCreate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userCreate$FormData(params: UserCreate$FormData$Params, context?: HttpContext): Observable<User> {
    return this.userCreate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `userRetrieve()` */
  static readonly UserRetrievePath = '/api/user/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userRetrieve()` instead.
   *
   * This method doesn't expect any request body.
   */
  userRetrieve$Response(params: UserRetrieve$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userRetrieve(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userRetrieve$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userRetrieve(params: UserRetrieve$Params, context?: HttpContext): Observable<User> {
    return this.userRetrieve$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `userUpdate()` */
  static readonly UserUpdatePath = '/api/user/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userUpdate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userUpdate$Json$Response(params: UserUpdate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userUpdate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userUpdate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userUpdate$Json(params: UserUpdate$Json$Params, context?: HttpContext): Observable<User> {
    return this.userUpdate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userUpdate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userUpdate$XWwwFormUrlencoded$Response(params: UserUpdate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userUpdate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userUpdate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userUpdate$XWwwFormUrlencoded(params: UserUpdate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<User> {
    return this.userUpdate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userUpdate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userUpdate$FormData$Response(params: UserUpdate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userUpdate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userUpdate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userUpdate$FormData(params: UserUpdate$FormData$Params, context?: HttpContext): Observable<User> {
    return this.userUpdate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `userDestroy()` */
  static readonly UserDestroyPath = '/api/user/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userDestroy()` instead.
   *
   * This method doesn't expect any request body.
   */
  userDestroy$Response(params: UserDestroy$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return userDestroy(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userDestroy$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userDestroy(params: UserDestroy$Params, context?: HttpContext): Observable<void> {
    return this.userDestroy$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `userPartialUpdate()` */
  static readonly UserPartialUpdatePath = '/api/user/{id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userPartialUpdate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userPartialUpdate$Json$Response(params: UserPartialUpdate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userPartialUpdate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userPartialUpdate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userPartialUpdate$Json(params: UserPartialUpdate$Json$Params, context?: HttpContext): Observable<User> {
    return this.userPartialUpdate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userPartialUpdate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userPartialUpdate$XWwwFormUrlencoded$Response(params: UserPartialUpdate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userPartialUpdate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userPartialUpdate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userPartialUpdate$XWwwFormUrlencoded(params: UserPartialUpdate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<User> {
    return this.userPartialUpdate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userPartialUpdate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userPartialUpdate$FormData$Response(params: UserPartialUpdate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userPartialUpdate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userPartialUpdate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userPartialUpdate$FormData(params: UserPartialUpdate$FormData$Params, context?: HttpContext): Observable<User> {
    return this.userPartialUpdate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `userCheckEmailCreate()` */
  static readonly UserCheckEmailCreatePath = '/api/user/check_email/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userCheckEmailCreate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userCheckEmailCreate$Json$Response(params: UserCheckEmailCreate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CheckUserResponse>> {
    return userCheckEmailCreate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userCheckEmailCreate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userCheckEmailCreate$Json(params: UserCheckEmailCreate$Json$Params, context?: HttpContext): Observable<CheckUserResponse> {
    return this.userCheckEmailCreate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CheckUserResponse>): CheckUserResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userCheckEmailCreate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userCheckEmailCreate$XWwwFormUrlencoded$Response(params: UserCheckEmailCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<CheckUserResponse>> {
    return userCheckEmailCreate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userCheckEmailCreate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userCheckEmailCreate$XWwwFormUrlencoded(params: UserCheckEmailCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<CheckUserResponse> {
    return this.userCheckEmailCreate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<CheckUserResponse>): CheckUserResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userCheckEmailCreate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userCheckEmailCreate$FormData$Response(params: UserCheckEmailCreate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<CheckUserResponse>> {
    return userCheckEmailCreate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userCheckEmailCreate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userCheckEmailCreate$FormData(params: UserCheckEmailCreate$FormData$Params, context?: HttpContext): Observable<CheckUserResponse> {
    return this.userCheckEmailCreate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<CheckUserResponse>): CheckUserResponse => r.body)
    );
  }

  /** Path part for operation `userCheckUsernameCreate()` */
  static readonly UserCheckUsernameCreatePath = '/api/user/check_username/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userCheckUsernameCreate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userCheckUsernameCreate$Json$Response(params: UserCheckUsernameCreate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CheckUserResponse>> {
    return userCheckUsernameCreate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userCheckUsernameCreate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userCheckUsernameCreate$Json(params: UserCheckUsernameCreate$Json$Params, context?: HttpContext): Observable<CheckUserResponse> {
    return this.userCheckUsernameCreate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CheckUserResponse>): CheckUserResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userCheckUsernameCreate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userCheckUsernameCreate$XWwwFormUrlencoded$Response(params: UserCheckUsernameCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<CheckUserResponse>> {
    return userCheckUsernameCreate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userCheckUsernameCreate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userCheckUsernameCreate$XWwwFormUrlencoded(params: UserCheckUsernameCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<CheckUserResponse> {
    return this.userCheckUsernameCreate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<CheckUserResponse>): CheckUserResponse => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userCheckUsernameCreate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userCheckUsernameCreate$FormData$Response(params: UserCheckUsernameCreate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<CheckUserResponse>> {
    return userCheckUsernameCreate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userCheckUsernameCreate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userCheckUsernameCreate$FormData(params: UserCheckUsernameCreate$FormData$Params, context?: HttpContext): Observable<CheckUserResponse> {
    return this.userCheckUsernameCreate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<CheckUserResponse>): CheckUserResponse => r.body)
    );
  }

  /** Path part for operation `userCurrentRetrieve()` */
  static readonly UserCurrentRetrievePath = '/api/user/current/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userCurrentRetrieve()` instead.
   *
   * This method doesn't expect any request body.
   */
  userCurrentRetrieve$Response(params?: UserCurrentRetrieve$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userCurrentRetrieve(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userCurrentRetrieve$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userCurrentRetrieve(params?: UserCurrentRetrieve$Params, context?: HttpContext): Observable<User> {
    return this.userCurrentRetrieve$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `userLoginCreate()` */
  static readonly UserLoginCreatePath = '/api/user/login/';

  /**
   * User login view
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userLoginCreate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userLoginCreate$Json$Response(params: UserLoginCreate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserLogin>> {
    return userLoginCreate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * User login view
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userLoginCreate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userLoginCreate$Json(params: UserLoginCreate$Json$Params, context?: HttpContext): Observable<UserLogin> {
    return this.userLoginCreate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserLogin>): UserLogin => r.body)
    );
  }

  /**
   * User login view
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userLoginCreate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userLoginCreate$XWwwFormUrlencoded$Response(params: UserLoginCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<UserLogin>> {
    return userLoginCreate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * User login view
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userLoginCreate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userLoginCreate$XWwwFormUrlencoded(params: UserLoginCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<UserLogin> {
    return this.userLoginCreate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserLogin>): UserLogin => r.body)
    );
  }

  /**
   * User login view
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userLoginCreate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userLoginCreate$FormData$Response(params: UserLoginCreate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<UserLogin>> {
    return userLoginCreate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * User login view
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userLoginCreate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userLoginCreate$FormData(params: UserLoginCreate$FormData$Params, context?: HttpContext): Observable<UserLogin> {
    return this.userLoginCreate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserLogin>): UserLogin => r.body)
    );
  }

  /** Path part for operation `userLogoutCreate()` */
  static readonly UserLogoutCreatePath = '/api/user/logout/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userLogoutCreate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userLogoutCreate$Json$Response(params?: UserLogoutCreate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userLogoutCreate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userLogoutCreate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userLogoutCreate$Json(params?: UserLogoutCreate$Json$Params, context?: HttpContext): Observable<User> {
    return this.userLogoutCreate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userLogoutCreate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userLogoutCreate$XWwwFormUrlencoded$Response(params?: UserLogoutCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userLogoutCreate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userLogoutCreate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userLogoutCreate$XWwwFormUrlencoded(params?: UserLogoutCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<User> {
    return this.userLogoutCreate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userLogoutCreate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userLogoutCreate$FormData$Response(params?: UserLogoutCreate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userLogoutCreate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userLogoutCreate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userLogoutCreate$FormData(params?: UserLogoutCreate$FormData$Params, context?: HttpContext): Observable<User> {
    return this.userLogoutCreate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `userPermissionsRetrieve()` */
  static readonly UserPermissionsRetrievePath = '/api/user/permissions/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userPermissionsRetrieve()` instead.
   *
   * This method doesn't expect any request body.
   */
  userPermissionsRetrieve$Response(params?: UserPermissionsRetrieve$Params, context?: HttpContext): Observable<StrictHttpResponse<Permission>> {
    return userPermissionsRetrieve(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userPermissionsRetrieve$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userPermissionsRetrieve(params?: UserPermissionsRetrieve$Params, context?: HttpContext): Observable<Permission> {
    return this.userPermissionsRetrieve$Response(params, context).pipe(
      map((r: StrictHttpResponse<Permission>): Permission => r.body)
    );
  }

  /** Path part for operation `userResetConfirmPasswordCreate()` */
  static readonly UserResetConfirmPasswordCreatePath = '/api/user/reset_confirm_password/';

  /**
   * Reset confirm password
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userResetConfirmPasswordCreate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userResetConfirmPasswordCreate$Json$Response(params: UserResetConfirmPasswordCreate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userResetConfirmPasswordCreate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * Reset confirm password
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userResetConfirmPasswordCreate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userResetConfirmPasswordCreate$Json(params: UserResetConfirmPasswordCreate$Json$Params, context?: HttpContext): Observable<User> {
    return this.userResetConfirmPasswordCreate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /**
   * Reset confirm password
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userResetConfirmPasswordCreate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userResetConfirmPasswordCreate$XWwwFormUrlencoded$Response(params: UserResetConfirmPasswordCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userResetConfirmPasswordCreate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * Reset confirm password
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userResetConfirmPasswordCreate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userResetConfirmPasswordCreate$XWwwFormUrlencoded(params: UserResetConfirmPasswordCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<User> {
    return this.userResetConfirmPasswordCreate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /**
   * Reset confirm password
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userResetConfirmPasswordCreate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userResetConfirmPasswordCreate$FormData$Response(params: UserResetConfirmPasswordCreate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userResetConfirmPasswordCreate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * Reset confirm password
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userResetConfirmPasswordCreate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userResetConfirmPasswordCreate$FormData(params: UserResetConfirmPasswordCreate$FormData$Params, context?: HttpContext): Observable<User> {
    return this.userResetConfirmPasswordCreate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `userResetPasswordCreate()` */
  static readonly UserResetPasswordCreatePath = '/api/user/reset_password/';

  /**
   * Reset password
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userResetPasswordCreate$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userResetPasswordCreate$Json$Response(params: UserResetPasswordCreate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userResetPasswordCreate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * Reset password
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userResetPasswordCreate$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userResetPasswordCreate$Json(params: UserResetPasswordCreate$Json$Params, context?: HttpContext): Observable<User> {
    return this.userResetPasswordCreate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /**
   * Reset password
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userResetPasswordCreate$XWwwFormUrlencoded()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userResetPasswordCreate$XWwwFormUrlencoded$Response(params: UserResetPasswordCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userResetPasswordCreate$XWwwFormUrlencoded(this.http, this.rootUrl, params, context);
  }

  /**
   * Reset password
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userResetPasswordCreate$XWwwFormUrlencoded$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  userResetPasswordCreate$XWwwFormUrlencoded(params: UserResetPasswordCreate$XWwwFormUrlencoded$Params, context?: HttpContext): Observable<User> {
    return this.userResetPasswordCreate$XWwwFormUrlencoded$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /**
   * Reset password
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userResetPasswordCreate$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userResetPasswordCreate$FormData$Response(params: UserResetPasswordCreate$FormData$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return userResetPasswordCreate$FormData(this.http, this.rootUrl, params, context);
  }

  /**
   * Reset password
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userResetPasswordCreate$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userResetPasswordCreate$FormData(params: UserResetPasswordCreate$FormData$Params, context?: HttpContext): Observable<User> {
    return this.userResetPasswordCreate$FormData$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

}
