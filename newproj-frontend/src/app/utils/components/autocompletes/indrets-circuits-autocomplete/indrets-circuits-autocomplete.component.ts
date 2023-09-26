import { Component, EventEmitter, Input, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { async } from "@angular/core/testing";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { IndretCircuitListFormService } from 'api/form-service';
import { IndretCircuit } from 'api/model';
import { Observable, Subject, concat, of, throwError } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-indrets-circuits-autocomplete',
    templateUrl: './indrets-circuits-autocomplete.component.html',
    styleUrls: ['./indrets-circuits-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => IndretsCircuitsAutocompleteComponent),
            multi: true
        }
    ]
})
export class IndretsCircuitsAutocompleteComponent implements OnInit, ControlValueAccessor {

    circuits: any;
    circuitsData: any = [];
    modelIndretsCircuits: any;

    circuits$: Observable<IndretCircuit[]>;
    circuitsInput$ = new Subject<string>();
    circuitsLoading = false;

    visible = true;
    @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;

    @Input('data')
    set data(value: any) {
        if (value) {
            this.circuitsData = [];
            if (value.length > 0) {
                this.circuitsData.push(...value);
            } else {
                this.circuitsData.push(value);
            }
            this.prepareIndretsCircuitsList();
            this.visible = false;
            setTimeout(() => {
                this.visible = true;
            }, 100); // restart
        }
    }

    @Input() multiple: boolean;
    @Input() disabled: boolean;
    @Input() bgWhite: boolean;
    @Input() placeholder: string;
    @Input() required: boolean;
    @Input() serverErrors: any;
    @Input() control: any;
    @Input() formService: any;
    @Input() matMinLength: number;
    @Input() position = 'auto';
    @Input() idIndrets : number;
    @Input() idCircuits : number;

    @Output()
    create = new EventEmitter<string>();

    @Output()
    emit = new EventEmitter<number[]>();

    @Output()
    change = new EventEmitter<void>();

    constructor(public circuitListFS: IndretCircuitListFormService) {}

    // constructor() { }

    ngOnInit(): void {
        this.prepareIndretsCircuitsList();
    }

    clear(): void {
        this.ngSelectComponent.handleClearClick();
    }

    setIndretsCircuits(node): void {
        if (node) {
            if (this.multiple) {
                this.circuits = [];
                for (const i in node) {
                    if (node[i]) {
                        this.circuits.push(node[i].id);
                    }
                }
            } else {
                this.circuits = node.id;
            }
        } else {
            this.circuits = null;
        }
        this.emit.emit(this.circuits);
        this.propagateChange(this.circuits);
        this.change.emit();
    }

    propagateChange = (_: any) => {
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            this.circuits = value;
            this.modelIndretsCircuits = value;
        } else {
            if (this.multiple) {
                this.circuits = [];
                this.modelIndretsCircuits = [];
            }
        }
    }

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {
    }

    private prepareIndretsCircuitsList(): void {
        this.circuits$ = concat(
            of(this.circuitsData), // Default is an empty list
            this.circuitsInput$.pipe(
                startWith(''),
                debounceTime(100),
                distinctUntilChanged(),
                switchMap((term: string) => {
                    if ((term && term.length >= this.matMinLength) || this.matMinLength === 0) {
                        this.circuitListFS.cancelPreviousRequest();
                        let params = {
                            limit: 1000,
                            search: term,
                            indret: this.idIndrets,
                            fields: 'id,name,sample_points.~all',
                        };
                        return this.circuitListFS.submit(params).pipe(
                            map(data => {
                                this.circuitsData.push(...data.results);
                                return data.results;
                            }),
                            catchError(error => throwError(error)),
                        );
                    }
                    return of([]);
                })
            )
        );
    }

    protected readonly async = async;
}


