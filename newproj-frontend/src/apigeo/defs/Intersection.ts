import { Neighborhood } from './Neighborhood';
import { Road } from './Road';
import { District } from './District';

export interface Intersection {
  codiNus?: string;
  via1?: Road;
  via2?: Road;
  barri?: Neighborhood;
  districte?: District;
  posicioRelativa?: string;
  localitzacio?: Location;
}
