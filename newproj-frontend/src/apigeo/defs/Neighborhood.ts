import { Geometry } from './Geometry';
import { Extension } from './Extension';

export interface Neighborhood {
  codi?: string;
  nom?: string;
  extensio?: Extension;
  geometria?: Geometry;
  localitzacio?: Location;
}
