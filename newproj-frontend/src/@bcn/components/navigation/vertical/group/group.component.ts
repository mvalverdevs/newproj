import { AuthService } from 'app/utils/auth.service';
import { Component, HostBinding, Input } from '@angular/core';

import { BCNNavigationItem } from '../../../../types';
import { Observable, of } from 'rxjs';

@Component({
    selector   : 'bcn-nav-vertical-group',
    templateUrl: './group.component.html',
    styleUrls  : ['./group.component.scss']
})
export class BCNNavVerticalGroupComponent
{
    @HostBinding('class')
    classes = 'nav-group nav-item';

    @Input()
    item: BCNNavigationItem;

    /**
     * Constructor
     */
    constructor(private authService: AuthService)
    {
    }

    isAllowed(nav: BCNNavigationItem): Observable<boolean> {
      if (nav.formService){
        return this.authService.isAllowed(nav.formService);
      } else {
        return of(true);
      }
    }


}
