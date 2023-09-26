import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { async } from "@angular/core/testing";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject, concat, of, retry, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { GeneralMasterTables } from "../../../../../api/defs/GeneralMasterTables";
import { GeneralMasterTablesListFormService } from "../../../../../api/forms/general-master-tables/list/list.service";
import { L } from '@angular/cdk/keycodes';

@Component({
    selector: 'app-area-autocomplete',
    templateUrl: './area-autocomplete.component.html',
    styleUrls: ['./area-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AreaAutocompleteComponent),
            multi: true
        }
    ]
})
export class AreaAutocompleteComponent implements OnInit, ControlValueAccessor {

    area: any;
    areaData: any = [];
    modelArea: any;

    area$: Observable<GeneralMasterTables[]>;
    areaInput$ = new Subject<string>();
    areaLoading = false;

    visible = true;

    @Input('data')
    set data(value: any) {
        if (value) {
            if (value.length > 0) {
                this.areaData.push(...value);
            } else {
                this.areaData.push(value);
            }
            this.prepareAreaList();
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

    constructor(public areaListFS: GeneralMasterTablesListFormService) {
    }

    ngOnInit(): void {
        this.prepareAreaList();
        if (!this.matMinLength && this.matMinLength !== 0) {
            this.matMinLength = 1;
        }
    }

    setArea(node): void {
        if (node) {
            if (this.multiple) {
                this.area = [];
                for (const i in node) {
                    if (node[i]) {
                        if (this.allData) {
                            this.area.push(node[i]);
                        } else {
                            this.area.push(node[i].id);
                        }
                    }
                }
            } else {
                if (this.allData) {
                    this.area = node;
                } else {
                    this.area = node.id;
                }
            }
        } else {
            this.area = null;
        }

        this.emit.emit(this.area);
        this.propagateChange(this.area);
        this.change.emit();
    }

    propagateChange = (_: any) => {
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            this.area = value;
            this.modelArea = value;
        } else {
            if (this.multiple) {
                this.area = [];
                this.modelArea = [];
            }
        }
    }

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {
    }

    public prepareAreaList(): void {
        this.area$ = concat(
            of(this.areaData), // Default is an empty list
            this.areaInput$.pipe(
                startWith(''),
                debounceTime(200),
                distinctUntilChanged(),
                switchMap((term: string) => {
                    if ((term && term.length >= this.matMinLength) || this.matMinLength === 0) {
                        // this.areaListFS.cancelPreviousRequest();
                        return this.areaListFS.submit({
                            search: term,
                            limit: 1000,
                            type: this.type,
                            is_visible: true,
                            fields: 'id,name,related_indrets',
                            status: 'active'
                        }, false).pipe(
                            map(data => {
                                this.areaData.push(...data.results);
                                return data.results;
                            }),
                            retry(2),
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


