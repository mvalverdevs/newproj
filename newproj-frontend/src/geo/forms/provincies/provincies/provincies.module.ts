/* tslint:disable:max-line-length */
/**
 * v1
 * GEORest
 * netiproa.corppro.imi.bcn:447
 */

import {NgModule} from '@angular/core';

import {ProvinciesService} from '../../../controllers/Provincies';
import {FormsSharedModule} from '../../forms-shared.module';
import {ProvinciesProvinciesFormService} from './provincies.service';


@NgModule({
  imports: [
    FormsSharedModule,
  ],
  providers: [
    ProvinciesService,
    ProvinciesProvinciesFormService,
  ],
})
export class ProvinciesProvinciesModule {}
