import { Geometry } from './Geometry';
import { Extension } from './Extension';

export interface Island {
  codi?: string;
  descripcio?: string;
  porcio?: string;
  codiQlc?: string;
  porcioQlc?: string;
  area?: number;
  districteId?: string;
  geocodi	?: string;
  extensio?: Extension;
  geometria?: Geometry;
  localitzacio?: Location;
}
