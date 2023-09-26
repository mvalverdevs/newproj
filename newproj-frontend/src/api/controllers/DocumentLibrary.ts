/* tslint:disable:max-line-length */

import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { APIConfigService } from '../apiconfig.service';

import * as __utils from '../yasag-utils';

import * as __model from '../model';

export interface ListParams {
  /** A search term. */
  search?: string;
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
  data: __model.DocumentLibraryCreate;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
}

export interface UploadParams {
  data: __model.DocumentLibraryFileUpload;
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
  /** A unique integer value identifying this document library. */
  id: number;
}

export interface UpdateParams {
  data: __model.DocumentLibraryUpdate;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this document library. */
  id: number;
}

export interface PartialUpdateParams {
  data: __model.DocumentLibraryUpdate;
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this document library. */
  id: number;
}

export interface DeleteParams {
  /** A unique integer value identifying this document library. */
  id: number;
}

export interface Base64Params {
  /** List of fields */
  fields?: string;
  /** List of nested objects */
  expand?: string;
  /** A unique integer value identifying this document library. */
  id: number;
}

@Injectable()
export class DocumentLibraryService {
  constructor(
    private http: HttpClient,
    private apiConfigService: APIConfigService) {}


  /** Views for PhotoLibrary REST */
  list(params: ListParams, multipart = false): Observable<__model.DocumentLibraryList> {
    const queryParamBase = {
      search: params.search,
      limit: params.limit,
      offset: params.offset,
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.get<__model.DocumentLibraryList>(this.apiConfigService.options.apiUrl + `/document_library/`, {params: queryParams});
  }

  /** Method to create a document */
  create(params: CreateParams, multipart = false): Observable<__model.DocumentLibrary> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined = __utils.getBodyParamsWithoutUndefined(multipart, bodyParams);

    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.post<__model.DocumentLibrary>(this.apiConfigService.options.apiUrl + `/document_library/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** Method to upload an document */
  upload(params: UploadParams, multipart = false): Observable<__model.DocumentLibraryFileUpload> {
    const bodyParams = params.data;
    const bodyParamsWithoutUndefined = __utils.getBodyParamsWithoutUndefined(multipart, bodyParams);

    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    return this.http.post<__model.DocumentLibraryFileUpload>(this.apiConfigService.options.apiUrl + `/document_library/upload/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** Method to retrieve a document. */
  read(params: ReadParams, multipart = false): Observable<__model.DocumentLibrary> {
    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.DocumentLibrary>(this.apiConfigService.options.apiUrl + `/document_library/${pathParams.id}/`, {params: queryParams});
  }

  /** Method to update a document */
  update(params: UpdateParams, multipart = false): Observable<__model.DocumentLibrary> {
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
    return this.http.put<__model.DocumentLibrary>(this.apiConfigService.options.apiUrl + `/document_library/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** Method to partially update a document */
  partialUpdate(params: PartialUpdateParams, multipart = false): Observable<__model.DocumentLibrary> {
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
    return this.http.patch<__model.DocumentLibrary>(this.apiConfigService.options.apiUrl + `/document_library/${pathParams.id}/`, bodyParamsWithoutUndefined, {params: queryParams});
  }

  /** Method to delete a document */
  delete(params: DeleteParams, multipart = false): Observable<string> {
    const pathParams = {
      id: params.id,
    };
    return this.http.delete(this.apiConfigService.options.apiUrl + `/document_library/${pathParams.id}/`, {responseType: 'text'});
  }

  /** Views for PhotoLibrary REST */
  base64(params: Base64Params, multipart = false): Observable<__model.DocumentLibraryBase64> {
    const queryParamBase = {
      fields: params.fields,
      expand: params.expand,
    };

    let queryParams = __utils.getQueryParams(queryParamBase);

    const pathParams = {
      id: params.id,
    };
    return this.http.get<__model.DocumentLibraryBase64>(this.apiConfigService.options.apiUrl + `/document_library/${pathParams.id}/base64/`, {params: queryParams});
  }
}
