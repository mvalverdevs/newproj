import { Geometry } from './Geometry';
import { Extension } from './Extension';

export interface District {
  codi?: string;
  descripcio?: string;
  extensio?: Extension;
  geometria?: Geometry;
  localitzacio?: Location;
}
