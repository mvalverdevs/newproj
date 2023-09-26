import { Component, OnInit, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable, Subject, of, throwError, concat } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map, catchError } from 'rxjs/operators';
import {RoadType} from '../../../../../../apigeo/defs/RoadType';
import {GeoBCNAddressService} from '../../../../../../apigeo/controllers/Address';

@Component({
    selector: 'app-roadtype-geo-autocomplete',
    templateUrl: './roadtype-geo-autocomplete.component.html',
    styleUrls: ['./roadtype-geo-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RoadtypeGeoAutocompleteComponent),
            multi: true
        }
    ]
})
export class RoadtypeGeoAutocompleteComponent implements OnInit, ControlValueAccessor {

    roadtypeGeo: any;
    roadtypeGeoData: any;
    modelRoadtypeGeo: any;

    roadtypeGeo$: Observable<RoadType[]>;
    roadtypeGeoInput$ = new Subject<string>();
    roadtypeGeoLoading = false;

    @Input('data')
    set data(value: RoadType[]) {
        this.roadtypeGeoData = value;
    }

    @Input() multiple: boolean;
    @Input() placeholder: string;
    @Input() required: boolean;
    @Input() serverErrors: any;
    @Input() control: any;
    @Input() matMinLength: number;

    @Output()
    emit = new EventEmitter<any>();

    @Output()
    change = new EventEmitter<void>();

    constructor(public geoBCNAddressService: GeoBCNAddressService) { }

    ngOnInit(): void {
        this.prepareRoadtypeGeoList();
        if (!this.matMinLength && this.matMinLength !== 0) {
            this.matMinLength = 1;
        }
    }

    setRoadtypeGeo(node): void {
        if (node) {
            if (this.multiple) {
                this.roadtypeGeo = [];
                for (const i in node) {
                  if (node[i]){
                    this.roadtypeGeo.push(node[i]);
                  }
                }
            } else {
                this.roadtypeGeo = node;
            }
        } else {
            this.roadtypeGeo = {};
        }
        this.emit.emit(this.roadtypeGeo);
        this.propagateChange(this.roadtypeGeo);
        this.change.emit();
    }

    propagateChange = (_: any) => {
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null && value.codi) {
            this.roadtypeGeo = value.codi.toString();
            this.modelRoadtypeGeo = value.codi.toString();
        } else {
            if (this.multiple) {
                this.roadtypeGeo = [];
                this.modelRoadtypeGeo = [];
            }
        }
    }

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {
    }

    private prepareRoadtypeGeoList(): void {
        this.roadtypeGeo$ = concat(
            of([]), // Default is an empty list
            this.roadtypeGeoInput$.pipe(
                startWith(''),
                debounceTime(700),
                distinctUntilChanged(),
                switchMap((term: string) => {
                    if ((term && term.length >= this.matMinLength) || this.matMinLength === 0) {

                        return this.geoBCNAddressService.roadTypes(term).pipe(
                            map(data => data),
                            catchError(error => throwError(error)),
                        );
                    }
                    if (this.roadtypeGeoData) {
                        if (this.multiple) {
                            return of(this.roadtypeGeoData);
                        }
                        return of([this.roadtypeGeoData]);
                    }
                    return of([]);
                })
            )
        );
    }

}

