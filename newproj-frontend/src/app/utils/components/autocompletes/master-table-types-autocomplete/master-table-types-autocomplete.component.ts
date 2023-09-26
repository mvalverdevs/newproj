import {Component, OnInit, forwardRef, Input, EventEmitter, Output} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {Observable, Subject, of, throwError, concat} from 'rxjs';
import {startWith, debounceTime, distinctUntilChanged, switchMap, map, catchError} from 'rxjs/operators';
import {async} from "@angular/core/testing";
import {GeneralMasterTablesTypes} from "../../../../../api/defs/GeneralMasterTablesTypes";
import {GeneralMasterTablesTypesFormService} from "../../../../../api/forms/general-master-tables/types/types.service";

@Component({
    selector: 'app-types-autocomplete',
    templateUrl: './master-table-types-autocomplete.component.html',
    styleUrls: ['./master-table-types-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MasterTableTypesAutocompleteComponent),
            multi: true
        }
    ]
})
export class MasterTableTypesAutocompleteComponent implements OnInit, ControlValueAccessor {

    types: any;
    typesData: any = [];
    modelTypes: any;

    types$: Observable<GeneralMasterTablesTypes[]>;
    typesInput$ = new Subject<string>();
    typesLoading = false;

    visible = true;

    @Input('data')
    set data(value: any) {
        if (value) {
            if (value.length > 0) {
                this.typesData.push(...value);
            } else {
                this.typesData.push(value);
            }
            this.prepareTypesList();
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


    @Output()
    create = new EventEmitter<string>();

    @Output()
    emit = new EventEmitter<number[]>();

    @Output()
    change = new EventEmitter<void>();

    constructor(public typesListFS: GeneralMasterTablesTypesFormService) {
    }

    ngOnInit(): void {
        this.prepareTypesList();
        if (!this.matMinLength && this.matMinLength !== 0) {
            this.matMinLength = 1;
        }
    }

    setTypes(node): void {
        if (node) {
            if (this.multiple) {
                this.types = [];
                for (const i in node) {
                    if (node[i]){
                        if (this.allData) {
                            this.types.push(node[i]);
                        } else {
                            this.types.push(node[i].id);
                        }
                    }
                }
            } else {
                if (this.allData) {
                    this.types = node;
                } else {
                    this.types = node.id;
                }
            }
        } else {
            this.types = null;
        }


        this.emit.emit(this.types);
        this.propagateChange(this.types);
        this.change.emit();
    }

    propagateChange = (_: any) => {
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            this.types = value;
            this.modelTypes = value;
        } else {
            if (this.multiple) {
                this.types = [];
                this.modelTypes = [];
            }
        }
    }

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {
    }

    public prepareTypesList(): void {
        this.types$ = concat(
            of(this.typesData), // Default is an empty list
            this.typesInput$.pipe(
                startWith(''),
                debounceTime(100),
                distinctUntilChanged(),
                switchMap((term: string) => {
                    if ((term && term.length >= this.matMinLength) || this.matMinLength === 0) {
                        this.typesListFS.cancelPreviousRequest();
                        return this.typesListFS.submit({
                            search: term,
                            limit: 1000,
                            fields: 'id,name',
                            status: 'active'
                        }).pipe(
                            map(data => {
                                // this.typesData.push(...data.results);
                                return data;
                            }),
                            catchError(error => throwError(error)),
                        );
                    }
                    return of([]);
                })
            )
        );
    }

    createNew = (tag) => {
        this.create.emit(tag);
    }

    protected readonly async = async;
}


