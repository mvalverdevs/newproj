import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-actions-create',
    templateUrl: './actions-create.component.html',
    styleUrls: ['./actions-create.component.scss'],
})
export class ActionsCreateComponent {
    constructor(private _router: Router) {}
}
