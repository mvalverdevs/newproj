/* tslint:disable:max-line-length */

import {NgModule} from '@angular/core';
import {GeoBCNAddressService} from './controllers/Address';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';


@NgModule({
    imports: [
        HttpClientJsonpModule
    ],
    providers: [
        GeoBCNAddressService,
    ],
})
export class GeoBCNAPIModule {
}
