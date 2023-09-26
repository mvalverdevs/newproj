import { NgModule } from '@angular/core';

import { BCNPerfectScrollbarDirective } from './bcn-perfect-scrollbar/bcn-perfect-scrollbar.directive';
import { BCNWaitingButtonDirective } from './bcn-waiting-button/bcn-waiting-button.directive';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { BCNInnerScrollDirective } from './bcn-inner-scroll/bcn-inner-scroll.directive';

@NgModule({
    declarations: [

        BCNPerfectScrollbarDirective,
        BCNWaitingButtonDirective,
        BCNInnerScrollDirective
    ],
    imports     : [],
    exports     : [

        BCNPerfectScrollbarDirective,
        BCNWaitingButtonDirective,
        BCNInnerScrollDirective
    ],
    // entryComponents: [MatProgressSpinner]

})
export class BCNDirectivesModule
{
}
