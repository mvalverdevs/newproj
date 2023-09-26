import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { async } from "@angular/core/testing";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject, concat, of } from 'rxjs';
import { GeneralMasterTables } from "../../../../../api/defs/GeneralMasterTables";

@Component({
    selector: 'app-example-autocomplete',
    templateUrl: './example-autocomplete.component.html',
    styleUrls: ['./example-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ExampleAutocompleteComponent),
            multi: true
        }
    ]
})
export class ExampleAutocompleteComponent implements OnInit, ControlValueAccessor {

    example: any;
    exampleData: any = [];
    modelExample: any;

    example$: Observable<GeneralMasterTables[]>;
    exampleInput$ = new Subject<string>();
    exampleLoading = false;

    visible = true;

    @Input('data')
    set data(value: any) {
        if (value) {
            if (value.length > 0) {
                this.exampleData.push(...value);
            } else {
                this.exampleData.push(value);
            }
            this.prepareExampleList();
            this.visible = false;
            setTimeout(() => {
                this.visible = true;
            }, 100); // restart
        }
    }

    @Input() addValue = false;
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

    constructor() {
    }

    ngOnInit(): void {
        this.prepareExampleList();
        if (!this.matMinLength && this.matMinLength !== 0) {
            this.matMinLength = 1;
        }
    }

    setExample(node): void {
        if (node) {
            if (this.multiple) {
                this.example = [];
                for (const i in node) {
                    if (node[i]) {
                        if (this.allData) {
                            this.example.push(node[i]);
                        } else {
                            this.example.push(node[i].id);
                        }
                    }
                }
            } else {
                if (this.allData) {
                    this.example = node;
                } else {
                    this.example = node.id;
                }
            }
        } else {
            this.example = null;
        }

        this.emit.emit(this.example);
        this.propagateChange(this.example);
        this.change.emit();
    }

    propagateChange = (_: any) => {
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            this.example = value;
            this.modelExample = value;
        } else {
            if (this.multiple) {
                this.example = [];
                this.modelExample = [];
            }
        }
    }

    public prepareExampleList(): void {
        this.example$ = concat(
            of(this.exampleData), // Default is an empty list
        );
    }


    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {
    }

    createNew = (tag) => {
        this.create.emit(tag);
    }

    protected readonly async = async;
}


