/* tslint:disable:max-line-length */
/**
 * v1
 * GEORest
 * netiproa.corppro.imi.bcn:447
 */

import {NgModule} from '@angular/core';

import { ProvinciesProvinciesModule } from './provincies/provincies.module';
import { ProvinciesProvinciesGetModule } from './provinciesGet/provinciesGet.module';
import { ProvinciesByVariantModule } from './byVariant/byVariant.module';
import { ProvinciesByNomModule } from './byNom/byNom.module';

@NgModule({
  imports: [
    ProvinciesProvinciesModule,
    ProvinciesProvinciesGetModule,
    ProvinciesByVariantModule,
    ProvinciesByNomModule,
  ],
  exports: [
    ProvinciesProvinciesModule,
    ProvinciesProvinciesGetModule,
    ProvinciesByVariantModule,
    ProvinciesByNomModule,
  ],
})
export class ProvinciesFormModule {}
