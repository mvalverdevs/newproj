import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { BCNNavigationComponent } from './navigation.component';
import { BCNNavVerticalItemComponent } from './vertical/item/item.component';
import { BCNNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { BCNNavVerticalGroupComponent } from './vertical/group/group.component';

@NgModule({
    imports     : [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,
    ],
    exports     : [
        BCNNavigationComponent
    ],
    declarations: [
        BCNNavigationComponent,
        BCNNavVerticalGroupComponent,
        BCNNavVerticalItemComponent,
        BCNNavVerticalCollapsableComponent
    ]
})
export class BCNNavigationModule
{
}
