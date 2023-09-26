import {Component, Input} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";

@Component({
    selector: 'app-no-results',
    templateUrl: './no-results.component.html',
    standalone: true,
    imports: [
        MatIconModule,
        NgIf,
        FlexLayoutModule
    ],
    styleUrls: ['./no-results.component.scss']
})
export class NoResultsComponent {
    @Input()
    messageType = 'big'; // big, medium or small

    constructor() {
    }

}
