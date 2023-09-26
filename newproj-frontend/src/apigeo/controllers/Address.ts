import { Neighborhood } from '../defs/Neighborhood';
import { District } from '../defs/District';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Address } from '../defs/Address';
import { map } from 'rxjs/operators';
import { RoadType } from 'apigeo/defs/RoadType';
import { Road } from 'apigeo/defs/Road';

const API_URL = environment.geoBCNUrl;

export interface SpatialQuery {
  x: number;
  y: number;
  proj?: string;
  radi?: number;
  /** Number of results to return per page. */
  max?: number;
  geometria?: boolean;
}

export interface GeoBCNAddressResponse {
  estat: string;
  resultats: Address[];
}

export interface GeoBCNDistrictsResponse {
  estat: string;
  resultats: District[];
}

export interface GeoBCNNeighborhoodsResponse {
  estat: string;
  resultats: District[];
}

export interface GeoBCNRoadTypesResponse {
  estat: string;
  resultats: RoadType[];
}

export interface GeoBCNRoadsResponse {
  estat: string;
  resultats: Road[];
}

export interface GeoBCNAddressesResponse {
  estat: string;
  resultats: Address[];
}



@Injectable()
export class GeoBCNAddressService {
  constructor(private http: HttpClient) { }

  listBySpatialQuery(params: SpatialQuery): Observable<GeoBCNAddressResponse> {
    const queryParamBase = {
      x: params.x,
      y: params.y,
      proj: params.proj,
      radi: params.radi,
      max: params.max,
      geometria: params.geometria
    };

    let queryParams = new HttpParams();
    Object.entries(queryParamBase).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'string') {
          queryParams = queryParams.set(key, value);
        }
        else {
          queryParams = queryParams.set(key, JSON.stringify(value));
        }
      }
    });

    return this.http.jsonp<GeoBCNAddressResponse>(API_URL + `/territori/adreces/?` + queryParams.toString(), 'callback');
  }

  listById(id: string): Observable<GeoBCNAddressResponse> {
    let queryParams = new HttpParams();
    queryParams = queryParams.set('id', id);

    return this.http.jsonp<GeoBCNAddressResponse>(API_URL + `/territori/adreces/` + queryParams.toString(), 'callback');
  }

  districts(search: string): Observable<District[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.set('nom', search);
    queryParams = queryParams.set('geometria', 'true');

    return this.http.jsonp<GeoBCNDistrictsResponse>(API_URL + `/territori/districtes/?` + queryParams.toString(), 'callback').pipe(
      map(results => results.resultats.sort((a, b) => a.codi.localeCompare(b.codi))) // Returns districts ordered by code
    );
  }

  neighborhoods(districtId, search: string): Observable<Neighborhood[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.set('id_districte', districtId);
    queryParams = queryParams.set('nom', search);
    queryParams = queryParams.set('geometria', 'true');

    return this.http.jsonp<GeoBCNNeighborhoodsResponse>(API_URL + `/territori/barris?` + queryParams.toString(), 'callback').pipe(
      map(results => results.resultats)
    );
  }

  roadTypes(search: string): Observable<RoadType[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.set('nom', search);

    return this.http.jsonp<GeoBCNRoadTypesResponse>(API_URL + `/territori/tipusvies?` + queryParams.toString(), 'callback').pipe(
      map(results => results.resultats)
    );
  }

  roads(roadTypeId, search: string): Observable<Road[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.set('id_tipus_via', roadTypeId);
    queryParams = queryParams.set('nom', search);
    queryParams = queryParams.set('geometria', 'true');

    return this.http.jsonp<GeoBCNRoadsResponse>(API_URL + `/territori/vies?` + queryParams.toString(), 'callback').pipe(
      map(results => results.resultats)
    );
  }

  roadById(road_id): Observable<Road[]> {
    return this.http.jsonp<GeoBCNRoadsResponse>(API_URL + `/territori/vies/` + road_id, 'callback').pipe(
      map(results => results.resultats)
    );
  }

  addresses(roadId, search: string): Observable<Address[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.set('id_via', roadId);
    queryParams = queryParams.set('numero', search);
    queryParams = queryParams.set('geometria', 'true');

    return this.http.jsonp<GeoBCNAddressesResponse>(API_URL + `/territori/portals?` + queryParams.toString(), 'callback').pipe(
      map(results => results.resultats)
    );
  }

}
