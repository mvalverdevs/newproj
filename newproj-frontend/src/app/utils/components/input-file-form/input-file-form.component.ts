import {Component, OnInit, forwardRef, Input, EventEmitter, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {MatButtonModule} from "@angular/material/button";
import {BCNErrorModule} from "../../../../@bcn/components/bcn-error/bcn-error.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-input-file-form',
    templateUrl: './input-file-form.component.html',
    styleUrls: ['./input-file-form.component.scss'],
    imports: [
        MatButtonModule,
        BCNErrorModule,
        FlexLayoutModule,
        MatIconModule
    ],
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputFileFormComponent),
            multi: true
        }
    ]
})
export class InputFileFormComponent implements OnInit, ControlValueAccessor {

    @Input() placeholder: string;
    @Input() required: boolean;
    @Input() serverErrors: any;
    @Input() control: any;
    @Input() accept = '*.*';

    @Output()
    emit = new EventEmitter<number[]>();

    @Output()
    change = new EventEmitter<void>();

    file: any;

    constructor() {
    }

    ngOnInit(): void {
    }

    propagateChange = (_: any) => {
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            const arr = value.split('/');
            this.file = {
                name: arr[arr.length - 1]
            };
        }
        setTimeout(() => {
            this.emit.emit(undefined);
            this.propagateChange(undefined);
            this.change.emit();
        }, 1000);
    }

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {
    }

    onFileChanged(event): void {
        this.file = undefined;

        if (event.target.files.length > 0) {
            const file: File = event.target.files[0];
            const myReader: FileReader = new FileReader();
            myReader.onload = (e) => {
                this.file = {
                    result: myReader.result,
                    name: event.target.files[0].name
                };
                this.emit.emit(this.file.result);
                this.propagateChange(this.file.result);
                this.change.emit();
            };
            myReader.readAsDataURL(file);
        }
    }

    clear(): void {
        this.file = undefined;
        this.emit.emit(undefined);
        this.propagateChange(undefined);
        this.change.emit();
    }

}

