import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-error403',
    templateUrl: './error403.component.html',
    standalone: true,
    imports: [
        FlexLayoutModule,
        MatIconModule
    ],
    styleUrls: ['./error403.component.scss']
})
export class Error403Component implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
        localStorage.clear();
    }

    goBack(): void {
        window.history.go(-2);
    }

}
