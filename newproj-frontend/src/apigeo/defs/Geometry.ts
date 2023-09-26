export enum GeometryType {
  'Polygon' = 'Polygon',
  'Point' = 'Point',
  'Multipolygon' = 'MultiPolygon',
}

export type coordsXY = number[];
export type PointGroup = coordsXY[];

export interface Geometry {
  type?: GeometryType;
  coordinates?: PointGroup[];
  proj?: string;
}
