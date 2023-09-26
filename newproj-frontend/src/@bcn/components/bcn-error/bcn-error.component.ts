import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {JsonPipe, NgForOf, NgIf} from "@angular/common";

@Component({
    selector: 'app-bcn-error',
    templateUrl: './bcn-error.component.html',
    standalone: true,
    imports: [
        NgIf,
        NgForOf,
        JsonPipe
    ],
    styleUrls: ['./bcn-error.component.scss']
})
export class BCNErrorComponent {

    @Input() control: AbstractControl;
    @Input() serverErrors: string[];

    @Input() requiredText = $localize`Aquest camp és obligatori`;

    constructor() {
    }
    ngOnInit():void{
    }

    typeOf(v): string {
        return typeof v;
    }

}
