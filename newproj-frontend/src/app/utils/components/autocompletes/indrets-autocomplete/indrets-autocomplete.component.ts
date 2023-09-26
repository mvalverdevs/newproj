import {Component, OnInit, forwardRef, Input, EventEmitter, Output, ViewChild} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {Observable, Subject, of, throwError, concat} from 'rxjs';
import {startWith, debounceTime, distinctUntilChanged, switchMap, map, catchError} from 'rxjs/operators';
import {User} from 'api/defs/User';
import {NgSelectComponent} from '@ng-select/ng-select';
import {async} from "@angular/core/testing";
import {IndretListFormService} from "../../../../../api/forms/indret/list/list.service";

@Component({
    selector: 'app-indrets-autocomplete',
    templateUrl: './indrets-autocomplete.component.html',
    styleUrls: ['./indrets-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => IndretsAutocompleteComponent),
            multi: true
        }
    ]
})
export class IndretsAutocompleteComponent implements OnInit, ControlValueAccessor {

    indrets: any;
    indretsData: any = [];
    modelIndrets: any;

    indrets$: Observable<User[]>;
    indretsInput$ = new Subject<string>();
    indretsLoading = false;

    visible = true;
    @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;

    @Input('data')
    set data(value: any) {
        if (value) {
            this.indretsData = [];
            if (value.length > 0) {
                this.indretsData.push(...value);
            } else {
                this.indretsData.push(value);
            }
            if (this.hasAddressIndret === 0) {
                this.prepareIndretsList();
            }
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
    @Input() hasAddressIndret: any;
    @Input() nameLabel: any;
    @Input() control: any;
    @Input() formService: any;
    @Input() matMinLength: number;
    @Input() position = 'auto';
    @Input() canCreate = false;
    @Input() idIndret;
    @Input() hasNoCircuits;

    @Output()
    create = new EventEmitter<string>();

    @Output()
    emit = new EventEmitter<number[]>();

    @Output()
    change = new EventEmitter<void>();

    constructor(public indretsListFS: IndretListFormService) {
    }

    // constructor() { }

    ngOnInit(): void {
        this.prepareIndretsList();
        if (!this.matMinLength && this.matMinLength !== 0) {
            this.matMinLength = 1;
        }
    }

    clear(): void {
        this.ngSelectComponent.handleClearClick();
    }

    setIndrets(node): void {
        if (node) {
            if (this.multiple) {
                this.indrets = [];
                for (const i in node) {
                    if (node[i]) {
                        this.indrets.push(node[i].id);
                    }
                }
            } else {
                this.indrets = node.id;
            }
        } else {
            this.indrets = null;
        }
        this.emit.emit(this.indrets);
        this.propagateChange(this.indrets);
        this.change.emit(this.indrets);
    }

    propagateChange = (_: any) => {
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            this.indrets = value;
            this.modelIndrets = value;
        } else {
            if (this.multiple) {
                this.indrets = [];
                this.modelIndrets = [];
            }
        }
    }

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {
    }

    private prepareIndretsList(): void {
        this.indrets$ = concat(
            of(this.indretsData), // Default is an empty list
            this.indretsInput$.pipe(
                startWith(''),
                debounceTime(100),
                distinctUntilChanged(),
                switchMap((term: string) => {
                    if ((term && term.length >= this.matMinLength) || this.matMinLength === 0) {
                        this.indretsListFS.cancelPreviousRequest();
                        let params = {
                            limit: 1000,
                            search: term,
                            fields: 'id,name,releated_indrets,nif,titularity.~all',
                            status: 'active',
                            skip_indret: this.idIndret,
                            has_no_circuits: this.hasNoCircuits
                        };
                        if (this.hasAddressIndret) {
                            // let params = {
                            params['type_of_road_name'] = this.formService.type_of_road_name;
                            params['street_name'] = this.formService.street_name;
                            params['start_number_name'] = this.formService.start_number_name;
                            params['neighborhood_name'] = this.formService.neighborhood_name;
                            params['district_name'] = this.formService.district_name;

                        }
                        return this.indretsListFS.submit(params).pipe(
                            map(data => {
                                data.results.map((i) => {
                                    if(i.titularity){
                                        i['fullLabel'] = '[ '+i.id +' ] ' + this.getName(i);
                                    }
                                    return i;
                                });

                                this.indretsData.push(...data.results);
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
    
    getName(indret){ 
        let result = "";
        if(indret.name || indret.name != ""){
            result = indret.name;
        } else if(indret.titularity) {
            if(indret.titularity.is_legal_entity){
                if(indret.titularity.social_reason){
                    result = indret.titularity.social_reason;
                } else {
                    result = indret.titularity.CIF ;
                }
            }else {
                result += indret.titularity.first_name? indret.titularity.first_name : '';
                result += ' ';
                result += indret.titularity.last_name? indret.titularity.last_name : '';
                result += ' ';
                result += indret.titularity.second_last_name ? indret.titularity.second_last_name : '';
                result += ' (';
                result += indret.titularity.identification ? indret.titularity.identification : '';
                result += ')';
            }
            }
        return result;
    }
    
    protected readonly async = async;
}


