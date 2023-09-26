import { Neighborhood } from './Neighborhood';
import { District } from './District';
import { Island } from './Island';
import { Road } from './Road';
import { Location } from './Location';

/* tslint:disable:max-line-length */

export enum NumberType {
  'NoNumber' = 0,
  'EvenNumber' = 1,
  'OddNumber' = 2,
  'Bloc' = 3,
  'InOutRoundabout' = 4,
  'Kilometer' = 5,
  'Island' = 6,
  'Special' = 7
}

export interface Address {
  id?: string;
  carrer?: Road;
  nomIndex?: string;
  numeroPostalInicial?: string;
  numeroPostalFinal?: string;
  tipusNumero?: NumberType;
  lletraPostalInicial?: string;
  lletraPostalFinal?: string;
  referenciaCadastral?: string;
  nomComplet?: string;
  numeracioPostal?: string;
  illa?: Island;
  districte?: District;
  barri?: Neighborhood;
  gpl?: Object;
  extraInfo: Object;
  seccioCensal?: string;
  seccioEst?: string;
  districtePostal?: string;
  solar?: string;
  parcelaId?: string;
  localitzacio?: Location;
}
