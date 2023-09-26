import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';

import {BCN_CONFIG} from './services/config.service';


@NgModule({
    providers: []
})
export class BCNModule {
    constructor(@Optional() @SkipSelf() parentModule: BCNModule) {
        if (parentModule) {
            throw new Error('BCNModule is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(): ModuleWithProviders<BCNModule> {
        return {
            ngModule: BCNModule,
            providers: [
                {
                    provide: BCN_CONFIG,
                    useValue: {
                        layout: {
                            style: 'sips-layout',
                            width: 'fullwidth',
                            navbar: {
                                hidden: false,
                                position: 'left',
                                folded: false,
                                background: 'mat-bcn-dark-700-bg'
                            },
                            toolbar: {
                                hidden: false,
                                position: 'below-static',
                                background: 'mat-white-500-bg'
                            },
                            footer: {
                                hidden: false,
                                position: 'below-static',
                                background: 'mat-bcn-dark-900-bg'
                            }
                        },
                        customScrollbars: true
                    }
                }
            ]
        };
    }
}
