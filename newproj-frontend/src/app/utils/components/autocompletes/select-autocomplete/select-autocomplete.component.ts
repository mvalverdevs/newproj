import {Component, OnInit, forwardRef, Input, EventEmitter, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {Observable, Subject, of, throwError, concat, retry} from 'rxjs';
import {startWith, debounceTime, distinctUntilChanged, switchMap, map, catchError} from 'rxjs/operators';
import {async} from "@angular/core/testing";
import {GeneralMasterTables} from "../../../../../api/defs/GeneralMasterTables";
import {GeneralMasterTablesListFormService} from "../../../../../api/forms/general-master-tables/list/list.service";

@Component({
    selector: 'app-select-autocomplete',
    templateUrl: './select-autocomplete.component.html',
    styleUrls: ['./select-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectAutocompleteComponent),
            multi: true
        }
    ]
})
export class SelectAutocompleteComponent implements OnInit, ControlValueAccessor {

    select: any;
    selectData: any = [];
    modelSelect: any;

    select$: Observable<GeneralMasterTables[]>;
    selectInput$ = new Subject<string>();
    selectLoading = false;

    visible = true;

    @Input('data')
    set data(value: any) {
        if (value) {
            if (value.length > 0) {
                this.selectData.push(...value);
            } else {
                this.selectData.push(value);
            }
            this.prepareSelectList();
            this.visible = false;
            setTimeout(() => {
                this.visible = true;
            }, 100); // restart
        }
    }

    @Input() multiple: boolean;
    @Input() disabled: boolean;
    @Input() heightAuto: boolean;
    @Input() bgWhite: boolean;
    @Input() placeholder: string;
    @Input() required: boolean;
    @Input() serverErrors: any;
    @Input() control: any;
    @Input() readonly: boolean;
    @Input() matMinLength: number;
    @Input() position = 'auto';
    @Input() canCreate = false;
    @Input() allData: boolean;
    @Input() type: string;


    @Output()
    create = new EventEmitter<string>();

    @Output()
    emit = new EventEmitter<number[]>();

    @Output()
    change = new EventEmitter<void>();

    constructor(public selectListFS: GeneralMasterTablesListFormService) {
    }

    ngOnInit(): void {
        this.prepareSelectList();
        if (!this.matMinLength && this.matMinLength !== 0) {
            this.matMinLength = 1;
        }
    }

    setSelect(node): void {
        if (node) {
            if (this.multiple) {
                this.select = [];
                for (const i in node) {
                    if (node[i]) {
                        if (this.allData) {
                            this.select.push(node[i]);
                        } else {
                            this.select.push(node[i].id);
                        }
                    }
                }
            } else {
                if (this.allData) {
                    this.select = node;
                } else {
                    this.select = node.id;
                }
            }
        } else {
            this.select = null;
        }


        this.emit.emit(this.select);
        this.propagateChange(this.select);
        this.change.emit(this.select);
    }

    propagateChange = (_: any) => {
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            this.select = value;
            this.modelSelect = value;
        } else {
            if (this.multiple) {
                this.select = [];
                this.modelSelect = [];
            }
        }
    }

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {
    }

    public prepareSelectList(): void {
        this.select$ = of(this.selectData);
    }

    createNew = (tag) => {
        this.create.emit(tag);
    }

    protected readonly async = async;
}


