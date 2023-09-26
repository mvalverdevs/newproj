import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {NgForOf, NgIf} from "@angular/common";

export interface DialogData {
    title: string;
    text?: string;
    html?: string;
    buttonConfirm?: string;
    buttonCancel?: string;
    buttonAux?: string;
    warnings?: Array<string>;
}

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule,
        FlexModule,
        NgIf,
        NgForOf
    ],
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        data.buttonCancel = data.buttonCancel ? data.buttonCancel : 'Cancel·lar';
        data.buttonConfirm = data.buttonConfirm ? data.buttonConfirm : 'Confirmar';
        data.buttonAux = data.buttonAux ? data.buttonAux : '';

    }

}
