// Core Modules
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientJsonpModule, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {APP_INITIALIZER} from '@angular/core';

// Runtime configuration module
import {RuntimeConfigService} from './runtime-config.service';

// BCN Modules
import {BCNModule} from '@bcn/bcn.module';
import {BCNSharedModule} from '@bcn/shared.module';
import {BCNSidebarModule} from '@bcn/components';

// API Modules
import {ApiFormsModule} from 'api/forms/apiforms.module';


// Material modules
import {SipsMaterialModule} from './sips-material.module';

// App modules
import {AppComponent} from './app.component';

import {APIConfigServiceOptions} from 'api/apiconfig.service';
import {GuidedTourModule} from 'ngx-guided-tour';
import {AppRoutingModule} from './app-routing.module';
import {CommonModule} from '@angular/common';
import {NgxMatDateAdapter, NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';
import {CustomDateAdapter} from "./utils/components/custom.date.adapter";
import {CommonRoutingModule} from "./modules/common-routing.module";
import {CookieModule} from 'ngx-cookie';


// Initialize runtime configuration values from /assets/runtime-config.json
const runtimeInitializerFn = (runtimeConfig: RuntimeConfigService) => {
    return () => {
        return runtimeConfig.loadRuntimeConfig();
    };
};

const configureControllerService = (runtimeConfig: RuntimeConfigService) => {
    const apiConfigServiceOptions = new APIConfigServiceOptions();
    apiConfigServiceOptions.apiUrl = runtimeConfig.config['apiUrl'];
    return apiConfigServiceOptions;
};


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        GuidedTourModule.forRoot(),
        ReactiveFormsModule,
        CommonRoutingModule,
        HttpClientModule,
        HttpClientJsonpModule,
        // Material modules
        SipsMaterialModule,

        // BCN modules
        BCNModule.forRoot(),
        BCNSharedModule,
        BCNSidebarModule,

        // API Modules
        ApiFormsModule,
        CookieModule.forRoot(),
        // HttpClientXsrfModule,
        AppComponent,
        HttpClientXsrfModule.withOptions({
            cookieName: 'csrftoken',
            headerName: 'X-Csrftoken'
        }),
        NgxMatNativeDateModule
    ],

    providers: [
        // Used to initialize runtime configuration values from /assets/runtime-config.json (such as 'x-ibm-client-id')
        {
            provide: APP_INITIALIZER,
            useFactory: runtimeInitializerFn,
            multi: true,
            deps: [RuntimeConfigService]
        },
        {
            provide: APIConfigServiceOptions,
            useFactory: configureControllerService,
            deps: [RuntimeConfigService]
        },
        {provide: NgxMatDateAdapter, useClass: CustomDateAdapter}
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
