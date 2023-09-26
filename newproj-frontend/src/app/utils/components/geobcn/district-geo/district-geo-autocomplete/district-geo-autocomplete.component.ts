import { Component, OnInit, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable, Subject, of, throwError, concat } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map, catchError } from 'rxjs/operators';
import {District} from '../../../../../../apigeo/defs/District';
import {GeoBCNAddressService} from '../../../../../../apigeo/controllers/Address';

@Component({
    selector: 'app-district-geo-autocomplete',
    templateUrl: './district-geo-autocomplete.component.html',
    styleUrls: ['./district-geo-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DistrictGeoAutocompleteComponent),
            multi: true
        }
    ]
})
export class DistrictGeoAutocompleteComponent implements OnInit, ControlValueAccessor {

    districtGeo: any;
    districtGeoData: any;
    modelDistrictGeo: any;

    districtGeo$: Observable<District[]>;
    districtGeoInput$ = new Subject<string>();
    districtGeoLoading = false;

    @Input('data')
    set data(value: District[]) {
        this.districtGeoData = value;
    }

    @Input() multiple: boolean;
    @Input() placeholder: string;
    @Input() required: boolean;
    @Input() serverErrors: any;
    @Input() control: any;
    @Input() matMinLength: number;
    @Input() clearUndefined = false; // Determines if clear button returns an empty object ('{}') or 'undefined'

    @Output()
    emit = new EventEmitter<any>();

    @Output()
    change = new EventEmitter<void>();

    constructor(public geoBCNAddressService: GeoBCNAddressService) { }

    ngOnInit(): void {
        this.prepareDistrictGeoList();
        if (!this.matMinLength && this.matMinLength !== 0) {
            this.matMinLength = 1;
        }
    }

    setDistrictGeo(node): void {
        if (node) {
            if (this.multiple) {
                this.districtGeo = [];
                for (const i in node) {
                  if (node[i]){
                    this.districtGeo.push(node[i]);
                  }
                }
            } else {
                this.districtGeo = node;
            }
        } else {
            this.districtGeo = this.clearUndefined ? undefined : {};
        }
        this.emit.emit(this.districtGeo);
        this.propagateChange(this.districtGeo);
        this.change.emit();
    }

    propagateChange = (_: any) => {
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null && value.codi) {
            this.districtGeo = value.codi.toString();
            this.modelDistrictGeo = value.codi.toString();
        } else {
            if (this.multiple) {
                this.districtGeo = [];
                this.modelDistrictGeo = [];
            }
        }
    }

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {
    }

    private prepareDistrictGeoList(): void {
        this.districtGeo$ = concat(
            of([]), // Default is an empty list
            this.districtGeoInput$.pipe(
                startWith(''),
                debounceTime(700),
                distinctUntilChanged(),
                switchMap((term: string) => {
                    if ((term && term.length >= this.matMinLength) || this.matMinLength === 0) {

                        return this.geoBCNAddressService.districts(term).pipe(
                            map(data => data),
                            catchError(error => throwError(error)),
                        );
                    }
                    if (this.districtGeoData) {
                        if (this.multiple) {
                            return of(this.districtGeoData);
                        }
                        return of([this.districtGeoData]);
                    }
                    return of([]);
                })
            )
        );
    }

}

