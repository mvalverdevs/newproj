import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {timer} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";

interface FormService {
    form: FormGroup;

    patch(value: any): void;
}

interface OrderingMethod {
    field: string;
    name: string;
}

@Component({
    selector: 'app-still-here',
    templateUrl: './still-here.component.html',
    imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatDialogModule
    ],
    standalone: true,
    styleUrls: ['./still-here.component.scss'],
})
export class StillHereComponent implements OnInit {

    seconds = 60;
    clock: any;
    source = timer(0, 1000);

    constructor(public dialogRef: MatDialogRef<StillHereComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit(): void {
        this.clock = this.source.subscribe(t => {
            this.seconds -= 1;
            if (this.seconds < 1) {
                this.clock.unsubscribe();
                this.dialogRef.close(true);
            }
        });
    }


}
