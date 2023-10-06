import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { navigation } from '../../navigation/navigation';

@Component({
    selector: 'nfge-layout',
    templateUrl: './nfge-layout.component.html',
    styleUrls: ['./nfge-layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NfgeLayoutComponent implements OnInit, OnDestroy {
    navigation: any;

    folded = false;

    /**
     * Constructor
     */
    constructor() {
        // Set the defaults
        this.navigation = navigation;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {

    }
}
