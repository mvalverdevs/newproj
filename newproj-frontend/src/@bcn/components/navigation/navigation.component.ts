import { BCNNavigationItem } from './../../types/bcn-navigation';
import { Component, Input, OnInit } from '@angular/core';
import { Subject, Observable, of, combineLatest } from 'rxjs';
import { takeUntil, tap, map } from 'rxjs/operators';

import { BCNNavigationService } from './navigation.service';
import { AuthService } from 'app/utils/auth.service';

@Component({
    selector     : 'bcn-navigation',
    templateUrl  : './navigation.component.html',
    styleUrls    : ['./navigation.component.scss'],
})
export class BCNNavigationComponent implements OnInit
{
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        private _bcnNavigationService: BCNNavigationService,
        private authService: AuthService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    isAllowed(nav: BCNNavigationItem): Observable<boolean> {
      if (nav.type === 'collapse'){
        const observables = [];
        nav.children.forEach(item => {
          if (item.formService) {
            observables.push(this.authService.isAllowed(item.formService));
          }
        });
        if (observables.length > 0){
          return combineLatest(observables).pipe(
            map(result => {
              return result.indexOf(true) !== -1;
            })
          );
        } else {
          return of(true);
        }
      } else {
        if (nav.formService){
          return this.authService.isAllowed(nav.formService);
        } else {
          return of(true);
        }
      }

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._bcnNavigationService.getCurrentNavigation();

        // Subscribe to the current navigation changes
        this._bcnNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.navigation = this._bcnNavigationService.getCurrentNavigation();
            });
    }
}
