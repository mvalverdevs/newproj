import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {Moment} from 'moment';
import * as moment from 'moment';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMaterialTimepickerComponent, NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {NgClass, NgIf} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";
import {BCNErrorModule} from "../../../../@bcn/components/bcn-error/bcn-error.module";

const MOMENT_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        // See DateFormats for other required formats.
    },
};

@Component({
    selector: 'app-date-time-picker',
    templateUrl: './date-time-picker.component.html',
    styleUrls: ['./date-time-picker.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatDatepickerModule,
        NgxMaterialTimepickerModule,
        FlexLayoutModule,
        BCNErrorModule,
        NgIf
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateTimePickerComponent),
            multi: true
        },
        {provide: DateAdapter, useClass: MomentDateAdapter},
        {provide: MAT_DATE_FORMATS, useValue: MOMENT_FORMATS},
        {provide: MAT_DATE_LOCALE, useValue: 'es'}
    ]
})
export class DateTimePickerComponent implements OnInit, ControlValueAccessor {

    datetime: string;
    _datetime: Moment;
    prettyDatetime: string;
    @Input() placeholder: string = '';
    @Input() serverErrors: any;
    @Input() required: boolean;
    @Input() control: any;
    @Input() type: 'datetime' | 'date' | 'time' = 'datetime';
    @Input() color: 'datetime-danger' | 'datetime-warn' | 'datetime-ok';

    @ViewChild('timepicker', {static: true}) timepicker: NgxMaterialTimepickerComponent;

    @Output() change = new EventEmitter<string>();  // Emits when there is a change in the selection

    constructor() {
        this._datetime = null;
        this.update();
    }

    ngOnInit(): void {

    }

    update(): void {
        if (this._datetime == null) {
            this.datetime = null;
            this.prettyDatetime = '';
        } else {
            if (this.type === 'datetime') {
                this.datetime = this._datetime.toISOString();
                this.prettyDatetime = this._datetime.format('DD/MM/YYYY HH:mm');
            }
            if (this.type === 'date') {
                this.datetime = this._datetime.format('YYYY-MM-DD');
                this.prettyDatetime = this._datetime.format('DD/MM/YYYY');
            }
            if (this.type === 'time') {
                this.datetime = this._datetime.format('HH:mm');
                this.prettyDatetime = this.datetime;
            }
        }
    }

    //
    // Control Value Accesor implementation
    //
    propagateChange = (_: any) => {
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            this._datetime = moment(value);
        } else {
            this._datetime = null;
        }
        this.update();
    }

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {
    }

    timeChange($event): void {
        if (!this._datetime) {
            this._datetime = moment();
        }
        this._datetime = moment(this._datetime.format('YYYY-MM-DD') + ' ' + $event);
        this.update();
        this.propagateChange(this.datetime);
        this.change.emit(this.datetime);
    }

    dateChange($event: MatDatepickerInputEvent<Moment>): void {
        if (this.type === 'date') {
            this._datetime = moment($event.value.format('YYYY-MM-DD') + ' ' + '00:00');
        } else {
            if (!this._datetime) {
                this._datetime = moment();
            }
            this._datetime = moment($event.value.format('YYYY-MM-DD') + ' ' + this._datetime.format('HH:mm'));
            this.timepicker.open();
        }
        this.update();
        this.propagateChange(this.datetime);
        this.change.emit(this.datetime);
    }
}
