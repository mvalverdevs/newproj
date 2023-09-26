/* tslint:disable:max-line-length */
/**
 * v1
 * GEORest
 * netiproa.corppro.imi.bcn:447
 */

import {NgModule} from '@angular/core';

import {MunicipisService} from '../../../controllers/Municipis';
import {FormsSharedModule} from '../../forms-shared.module';
import {MunicipisCheckCodiMunicipiFormService} from './checkCodiMunicipi.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    MunicipisService,
    MunicipisCheckCodiMunicipiFormService,
  ],
})
export class MunicipisCheckCodiMunicipiModule {}
