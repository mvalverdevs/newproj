import {Component, Input, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {SubscriptionLike} from 'rxjs';
import {ConfirmDialogComponent} from "../dialogs/confirm/confirm.component";
import {MatDialog} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@Component({
    selector: 'go-back-button',
    imports: [
        MatButtonModule,
        MatIconModule
    ],
    standalone: true,
    templateUrl: './go-back-button.component.html'
})
export class GoBackButtonComponent implements OnDestroy {

    protected subcription$: SubscriptionLike;
    parent: string = null;
    @Input() justOneStep = true;
    @Input() out = false;

    constructor(private location: Location,
                private dialog: MatDialog) {
        this.subcription$ = this.location.subscribe(val => {
            if (this.parent) {
                let current = val.url.split(';')[0];
                current = current.split('#')[0];
                if (current !== this.parent && current.startsWith(this.parent)) {
                    this.location.back();
                } else {
                    this.parent = null;
                }
            }

        });
    }

    goBack(): void {
        if (!this.out) {
            const path = this.location.path().split('/');
            path.pop();

            this.parent = '';
            if (!this.justOneStep) {
                path.forEach(subpath => {
                    if (subpath !== "") {
                        this.parent = this.parent + '/' + subpath;
                    }
                });
            }
            this.location.back();
        } else {
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                width: '600px',
                data: {
                    title: 'Sortir sense guardar',
                    text: `Estàs segur que vols sortir? Perdràs els canvis que no hagis guardat.`
                }
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.out = false;
                    this.goBack();
                }
            });
        }

    }

    ngOnDestroy(): void {
        this.subcription$.unsubscribe();
    }
}
