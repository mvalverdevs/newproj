/* tslint:disable:max-line-length */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { APIConfigService } from '../apiconfig.service';

import * as __utils from '../yasag-utils';

import * as __model from '../model';

export interface ListParams {
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  is_active?: string;
  roles?: string;
  reference_in?: string;
  /** A search term. */
  search?: string;
  /** Which field to use when ordering the results. */
  ordering?: string;
  /** Number of results to return per page. */
  limit?: number;
  /** The initial index from which to return the results. */
  offset?: number;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface CreateParams {
  data: __model.UserCreation;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface LoginParams {
  data: __model.UserLogin;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface LogoutParams {
  data: __model.UserLogin;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface ResetConfirmPasswordParams {
  data: __model.ResetPassword;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface ResetPasswordParams {
  data: __model.Email;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface ReadParams {
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this user. */
  id: number;
}

export interface UpdateParams {
  data: __model.User;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this user. */
  id: number;
}

export interface PartialUpdateParams {
  data: __model.User;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this user. */
  id: number;
}

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  list(params: ListParams, multipart = false): Observable<__model.UserList> {
    const queryParamBase = {
      username: params.username,
      first_name: params.first_name,
      last_name: params.last_name,
      email: params.email,
      phone: params.phone,
      is_active: params.is_active,
      roles: params.roles,
      reference_in: params.reference_in,
      search: params.search,
      ordering: params.ordering,
      limit: params.limit,
      offset: params.offset,
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.get<__model.UserList>(this.apiConfigService.options.apiUrl + `/user/`, {params: queryParams});
  }

  /** User register view */
  create(params: CreateParams, multipart = false): Observable<__model.User> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined = __utils.getBodyParamsWithoutUndefined(multipart, bodyParams);

    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.post<__model.User>(this.apiConfigService.options.apiUrl + `/user/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** User login view */
  login(params: LoginParams, multipart = false): Observable<__model.UserLogin> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined = __utils.getBodyParamsWithoutUndefined(multipart, bodyParams);

    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.post<__model.UserLogin>(this.apiConfigService.options.apiUrl + `/user/login/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  logout(params: LogoutParams, multipart = false): Observable<__model.User> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined = __utils.getBodyParamsWithoutUndefined(multipart, bodyParams);

    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.post<__model.User>(this.apiConfigService.options.apiUrl + `/user/logout/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** Reset confirm password */
  resetConfirmPassword(params: ResetConfirmPasswordParams, multipart = false): Observable<__model.User> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined = __utils.getBodyParamsWithoutUndefined(multipart, bodyParams);

    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.post<__model.User>(this.apiConfigService.options.apiUrl + `/user/reset_confirm_password/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** Reset password */
  resetPassword(params: ResetPasswordParams, multipart = false): Observable<__model.Email> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined = __utils.getBodyParamsWithoutUndefined(multipart, bodyParams);

    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.post<__model.Email>(this.apiConfigService.options.apiUrl + `/user/reset_password/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  read(params: ReadParams, multipart = false): Observable<__model.User> {
    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.User>(this.apiConfigService.options.apiUrl + `/user/${pathParams.id}/`, {params: queryParams});
  }

  update(params: UpdateParams, multipart = false): Observable<__model.User> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined = __utils.getBodyParamsWithoutUndefined(multipart, bodyParams);

    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    const pathParams = {
      id: params.id,
    };
    return this.http.put<__model.User>(this.apiConfigService.options.apiUrl + `/user/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  partialUpdate(params: PartialUpdateParams, multipart = false): Observable<__model.User> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined = __utils.getBodyParamsWithoutUndefined(multipart, bodyParams);

    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    const pathParams = {
      id: params.id,
    };
    return this.http.patch<__model.User>(this.apiConfigService.options.apiUrl + `/user/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }
}
