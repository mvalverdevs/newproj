/* tslint:disable:max-line-length */
/**
 * v1
 * GEORest
 * netiproa.corppro.imi.bcn:447
 */

import {NgModule} from '@angular/core';

import {ProvinciesService} from '../../../controllers/Provincies';
import {FormsSharedModule} from '../../forms-shared.module';
import {ProvinciesProvinciesGetFormService} from './provinciesGet.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    ProvinciesService,
    ProvinciesProvinciesGetFormService,
  ],
})
export class ProvinciesProvinciesGetModule {}
