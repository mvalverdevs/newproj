/* tslint:disable:max-line-length */
/**
 * v1
 * GEORest
 * netiproa.corppro.imi.bcn:447
 */

import {NgModule} from '@angular/core';

import { MunicipisMunicipisModule } from './municipis/municipis.module';
import { MunicipisQuinCodiMunicipiModule } from './quinCodiMunicipi/quinCodiMunicipi.module';
import { MunicipisCheckCodiMunicipiModule } from './checkCodiMunicipi/checkCodiMunicipi.module';
import { MunicipisVariantsMunicipisProvModule } from './variantsMunicipisProv/variantsMunicipisProv.module';

@NgModule({
  imports: [
    MunicipisMunicipisModule,
    MunicipisQuinCodiMunicipiModule,
    MunicipisCheckCodiMunicipiModule,
    MunicipisVariantsMunicipisProvModule,
  ],
  exports: [
    MunicipisMunicipisModule,
    MunicipisQuinCodiMunicipiModule,
    MunicipisCheckCodiMunicipiModule,
    MunicipisVariantsMunicipisProvModule,
  ],
})
export class MunicipisFormModule {}
