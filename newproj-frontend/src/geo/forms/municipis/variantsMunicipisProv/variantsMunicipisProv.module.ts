/* tslint:disable:max-line-length */
/**
 * v1
 * GEORest
 * netiproa.corppro.imi.bcn:447
 */

import {NgModule} from '@angular/core';

import {MunicipisService} from '../../../controllers/Municipis';
import {FormsSharedModule} from '../../forms-shared.module';
import {MunicipisVariantsMunicipisProvFormService} from './variantsMunicipisProv.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    MunicipisService,
    MunicipisVariantsMunicipisProvFormService,
  ],
})
export class MunicipisVariantsMunicipisProvModule {}
