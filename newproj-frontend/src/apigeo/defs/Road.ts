import { Location } from './Location';
import { RoadType } from './RoadType';

export interface Road {
  codi?: string;
  tipusViaAbr?: string;
  nom?: string;
  nomLlarg?: string;
  nom18?: string;
  nom27?: string;
  tipusVia?: RoadType;
  extraInfo?: Object;
  nomComplet?: string;
  localitzacio?: Location;
}
