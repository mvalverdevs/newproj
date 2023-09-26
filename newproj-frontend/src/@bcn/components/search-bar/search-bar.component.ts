import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BCNConfigService } from '../../services/config.service';

@Component({
    selector   : 'bcn-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls  : ['./search-bar.component.scss']
})
export class BCNSearchBarComponent implements OnInit, OnDestroy
{
    collapsed: boolean;
    bcnConfig: any;

    @Output()
    input: EventEmitter<any>;

    // Private
    private _unsubscribeAll: Subject<void>;

    /**
     * Constructor
     *
     * @param {BCNConfigService} _bcnConfigService
     */
    constructor(
        private _bcnConfigService: BCNConfigService
    )
    {
        // Set the defaults
        this.input = new EventEmitter();
        this.collapsed = true;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to config changes
        this._bcnConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (config) => {
                    this.bcnConfig = config;
                }
            );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Collapse
     */
    collapse(): void
    {
        this.collapsed = true;
    }

    /**
     * Expand
     */
    expand(): void
    {
        this.collapsed = false;
    }

    /**
     * Search
     *
     * @param event
     */
    search(event): void
    {
        this.input.emit(event.target.value);
    }

}
