import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { BCNSearchBarComponent } from './search-bar.component';

@NgModule({
    declarations: [
        BCNSearchBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        BCNSearchBarComponent
    ]
})
export class BCNSearchBarModule
{
}
