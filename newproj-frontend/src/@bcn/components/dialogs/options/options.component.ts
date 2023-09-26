import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";

export interface DialogData {
    title: string;
    text: string;
    list?: Array<string>;
}

@Component({
    selector: 'app-dialog-options',
    templateUrl: './options.component.html',
    standalone: true,
    imports: [
        MatDialogModule,
        NgIf,
        NgForOf,
        MatButtonModule,
        FlexModule,
        MatFormFieldModule,
        MatIconModule
    ],
    styleUrls: ['./options.component.scss']
})
export class OptionsDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<OptionsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

}
