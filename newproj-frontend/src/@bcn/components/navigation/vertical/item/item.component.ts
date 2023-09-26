import { BCNThemeService } from './../../../../services/theme.service';
import { Component, HostBinding, Input } from '@angular/core';

import { BCNNavigationItem } from '../../../../types';

@Component({
    selector   : 'bcn-nav-vertical-item',
    templateUrl: './item.component.html',
    styleUrls  : ['./item.component.scss']
})
export class BCNNavVerticalItemComponent
{
    @HostBinding('class')
    classes = 'nav-item';

    @Input()
    item: BCNNavigationItem;

    /**
     * Constructor
     */
    constructor(public themeService: BCNThemeService)
    {
    }


}
