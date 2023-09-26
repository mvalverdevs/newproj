import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,
    ],
    exports: [],
    declarations: []
})
export class BCNErrorModule {
}
