/* tslint:disable:max-line-length */
/**
 * v1
 * GEORest
 * netiproa.corppro.imi.bcn:447
 */

import {NgModule} from '@angular/core';

import { MunicipisFormModule } from './municipis/municipis.module';
import { ProvinciesFormModule } from './provincies/provincies.module';

@NgModule({
  imports: [
    MunicipisFormModule,
    ProvinciesFormModule,
  ],
  exports: [
    MunicipisFormModule,
    ProvinciesFormModule,
  ],
})
export class ApiFormsModule {}
