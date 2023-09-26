import { Component, OnInit, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable, Subject, of, throwError, concat } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map, catchError } from 'rxjs/operators';
import {Neighborhood} from '../../../../../../apigeo/defs/Neighborhood';
import {GeoBCNAddressService} from '../../../../../../apigeo/controllers/Address';

@Component({
    selector: 'app-neighborhood-geo-autocomplete',
    templateUrl: './neighborhood-geo-autocomplete.component.html',
    styleUrls: ['./neighborhood-geo-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NeighborhoodGeoAutocompleteComponent),
            multi: true
        }
    ]
})
export class NeighborhoodGeoAutocompleteComponent implements OnInit, ControlValueAccessor {

    neighborhoodGeo: any;
    neighborhoodGeoData: any;
    modelNeighborhoodGeo: any;

    neighborhoodGeo$: Observable<Neighborhood[]>;
    neighborhoodGeoInput$ = new Subject<string>();
    neighborhoodGeoLoading = false;

    @Input('data')
    set data(value: Neighborhood[]) {
        this.neighborhoodGeoData = value;
    }

    @Input() multiple: boolean;
    @Input() placeholder: string;
    @Input() required: boolean;
    @Input() serverErrors: any;
    @Input() control: any;
    @Input() matMinLength: number;
    @Input() clearUndefined = false; // Determines if clear button returns an empty object ('{}') or 'undefined'
    @Input() districtId: any;
    @Input('district')
    set district(value: any) {
      this.districtId = value;
      this.prepareNeighborhoodGeoList();
    }

    @Output()
    emit = new EventEmitter<any>();

    @Output()
    change = new EventEmitter<void>();

    constructor(public geoBCNAddressService: GeoBCNAddressService) { }

    ngOnInit(): void {
        this.prepareNeighborhoodGeoList();
        if (!this.matMinLength && this.matMinLength !== 0) {
            this.matMinLength = 1;
        }
    }

    setNeighborhoodGeo(node): void {
        if (node) {
            if (this.multiple) {
                this.neighborhoodGeo = [];
                for (const i in node) {
                  if (node[i]){
                    this.neighborhoodGeo.push(node[i]);
                  }
                }
            } else {
                this.neighborhoodGeo = node;
            }
        } else {
            this.neighborhoodGeo = this.clearUndefined ? undefined : {};
        }
        this.emit.emit(this.neighborhoodGeo);
        this.propagateChange(this.neighborhoodGeo);
        this.change.emit();
    }

    propagateChange = (_: any) => {
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            if (this.multiple) {
                this.neighborhoodGeo = value.map((item) => item.codi);
                this.modelNeighborhoodGeo = value.map((item) => item.codi);
            }else{
                if (value.codi) { // Objeto geo (usando geo form)
                    this.neighborhoodGeo = value.codi.toString();
                    this.modelNeighborhoodGeo = value.codi.toString();
                }else if (typeof value === 'string') { // Solo string (usando directamente el autocomplete)
                    this.neighborhoodGeo = value.toString();
                    this.modelNeighborhoodGeo = value.toString();
                }else{ // Vacío
                    this.neighborhoodGeo = this.clearUndefined ? undefined : {};
                    this.modelNeighborhoodGeo = this.clearUndefined ? undefined : {};
                }
            }
        }
    }

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {
    }

    private prepareNeighborhoodGeoList(): void {
        this.neighborhoodGeo$ = concat(
            of([]), // Default is an empty list
            this.neighborhoodGeoInput$.pipe(
                startWith(''),
                debounceTime(700),
                distinctUntilChanged(),
                switchMap((term: string) => {
                    if ((term && term.length >= this.matMinLength) || this.matMinLength === 0) {

                        return this.geoBCNAddressService.neighborhoods(this.districtId || '', term).pipe(
                            map(data => data),
                            catchError(error => throwError(error)),
                        );
                    }
                    if (this.neighborhoodGeoData) {
                        if (this.multiple) {
                            return of(this.neighborhoodGeoData);
                        }
                        return of([this.neighborhoodGeoData]);
                    }
                    return of([]);
                })
            )
        );
    }

}

