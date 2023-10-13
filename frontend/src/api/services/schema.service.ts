/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { schemaRetrieve$Json } from '../fn/schema/schema-retrieve-json';
import { SchemaRetrieve$Json$Params } from '../fn/schema/schema-retrieve-json';
import { schemaRetrieve$VndOaiOpenapi } from '../fn/schema/schema-retrieve-vnd-oai-openapi';
import { SchemaRetrieve$VndOaiOpenapi$Params } from '../fn/schema/schema-retrieve-vnd-oai-openapi';
import { schemaRetrieve$Yaml } from '../fn/schema/schema-retrieve-yaml';
import { SchemaRetrieve$Yaml$Params } from '../fn/schema/schema-retrieve-yaml';

@Injectable({ providedIn: 'root' })
export class SchemaService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `schemaRetrieve()` */
  static readonly SchemaRetrievePath = '/api/schema/';

  /**
   * OpenApi3 schema for this API. Format can be selected via content negotiation.
   *
   * - YAML: application/vnd.oai.openapi
   * - JSON: application/vnd.oai.openapi+json
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `schemaRetrieve$VndOaiOpenapi()` instead.
   *
   * This method doesn't expect any request body.
   */
  schemaRetrieve$VndOaiOpenapi$Response(params?: SchemaRetrieve$VndOaiOpenapi$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: any;
}>> {
    return schemaRetrieve$VndOaiOpenapi(this.http, this.rootUrl, params, context);
  }

  /**
   * OpenApi3 schema for this API. Format can be selected via content negotiation.
   *
   * - YAML: application/vnd.oai.openapi
   * - JSON: application/vnd.oai.openapi+json
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `schemaRetrieve$VndOaiOpenapi$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  schemaRetrieve$VndOaiOpenapi(params?: SchemaRetrieve$VndOaiOpenapi$Params, context?: HttpContext): Observable<{
[key: string]: any;
}> {
    return this.schemaRetrieve$VndOaiOpenapi$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: any;
}>): {
[key: string]: any;
} => r.body)
    );
  }

  /**
   * OpenApi3 schema for this API. Format can be selected via content negotiation.
   *
   * - YAML: application/vnd.oai.openapi
   * - JSON: application/vnd.oai.openapi+json
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `schemaRetrieve$Yaml()` instead.
   *
   * This method doesn't expect any request body.
   */
  schemaRetrieve$Yaml$Response(params?: SchemaRetrieve$Yaml$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: any;
}>> {
    return schemaRetrieve$Yaml(this.http, this.rootUrl, params, context);
  }

  /**
   * OpenApi3 schema for this API. Format can be selected via content negotiation.
   *
   * - YAML: application/vnd.oai.openapi
   * - JSON: application/vnd.oai.openapi+json
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `schemaRetrieve$Yaml$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  schemaRetrieve$Yaml(params?: SchemaRetrieve$Yaml$Params, context?: HttpContext): Observable<{
[key: string]: any;
}> {
    return this.schemaRetrieve$Yaml$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: any;
}>): {
[key: string]: any;
} => r.body)
    );
  }

  /**
   * OpenApi3 schema for this API. Format can be selected via content negotiation.
   *
   * - YAML: application/vnd.oai.openapi
   * - JSON: application/vnd.oai.openapi+json
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `schemaRetrieve$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  schemaRetrieve$Json$Response(params?: SchemaRetrieve$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: any;
}>> {
    return schemaRetrieve$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * OpenApi3 schema for this API. Format can be selected via content negotiation.
   *
   * - YAML: application/vnd.oai.openapi
   * - JSON: application/vnd.oai.openapi+json
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `schemaRetrieve$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  schemaRetrieve$Json(params?: SchemaRetrieve$Json$Params, context?: HttpContext): Observable<{
[key: string]: any;
}> {
    return this.schemaRetrieve$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: any;
}>): {
[key: string]: any;
} => r.body)
    );
  }

}
