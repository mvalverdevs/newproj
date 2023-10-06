import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BCNSidebarModule } from '@bcn/components';
import { BCNSharedModule } from '@bcn/shared.module';

import { ContentModule } from '../components/content/content.module';
import { NavbarModule } from '../components/navbar/navbar.module';
import { ToolbarModule } from '../components/toolbar/toolbar.module';

import { NfgeLayoutComponent } from './nfge-layout.component';
import { GlobalSidebarModule } from '../components/global-sidebar/global-sidebar.module';

@NgModule({
    declarations: [
        NfgeLayoutComponent
    ],
    imports: [
        RouterModule,

        BCNSharedModule,
        BCNSidebarModule,
        GlobalSidebarModule,

        ContentModule,
        NavbarModule,
        ToolbarModule
    ],
    exports: [
        NfgeLayoutComponent
    ]
})
export class NfgeLayoutModule {
}
