import { NgModule } from '@angular/core';

import { BCNSidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [
        BCNSidebarComponent
    ],
    exports     : [
        BCNSidebarComponent
    ]
})
export class BCNSidebarModule
{
}
