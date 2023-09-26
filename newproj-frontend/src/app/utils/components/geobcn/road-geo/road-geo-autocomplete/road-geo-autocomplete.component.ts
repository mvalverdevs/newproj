import { Component, OnInit, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable, Subject, of, throwError, concat } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map, catchError } from 'rxjs/operators';
import {Road} from '../../../../../../apigeo/defs/Road';
import {GeoBCNAddressService} from '../../../../../../apigeo/controllers/Address';

@Component({
    selector: 'app-road-geo-autocomplete',
    templateUrl: './road-geo-autocomplete.component.html',
    styleUrls: ['./road-geo-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RoadGeoAutocompleteComponent),
            multi: true
        }
    ]
})
export class RoadGeoAutocompleteComponent implements OnInit, ControlValueAccessor {

    roadGeo: any;
    roadGeoData: any;
    modelRoadGeo: any;

    roadGeo$: Observable<Road[]>;
    roadGeoInput$ = new Subject<string>();
    roadGeoLoading = false;

    @Input('data')
    set data(value: Road[]) {
        this.roadGeoData = value;
    }

    @Input() multiple: boolean;
    @Input() placeholder: string;
    @Input() required: boolean;
    @Input() serverErrors: any;
    @Input() control: any;
    @Input() matMinLength: number;
    @Input() roadTypeId: any;
    @Input('typeRoad')
    set typeRoad(value: any) {
      this.roadTypeId = value;
      this.prepareRoadGeoList();
    }

    @Output()
    emit = new EventEmitter<any>();

    @Output()
    change = new EventEmitter<void>();

    constructor(public geoBCNAddressService: GeoBCNAddressService) { }

    ngOnInit(): void {
        if (!this.matMinLength && this.matMinLength !== 0) {
            this.matMinLength = 1;
        }
    }

    setRoadGeo(node): void {
        if (node) {
            if (this.multiple) {
                this.roadGeo = [];
                for (const i in node) {
                  if (node[i]){
                    this.roadGeo.push(node[i]);
                  }
                }
            } else {
                this.roadGeo = node;
            }
        } else {
            this.roadGeo = {};
        }
        this.emit.emit(this.roadGeo);
        this.propagateChange(this.roadGeo);
        this.change.emit();
    }

    propagateChange = (_: any) => {
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
          if (value.codi) {
            this.roadGeo = value.codi.toString();
            this.modelRoadGeo = value.codi.toString();
          }else{
            this.roadGeo = {};
            this.modelRoadGeo = {};
          }
        } else {
            if (this.multiple) {
                this.roadGeo = [];
                this.modelRoadGeo = [];
            }
        }
    }

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {
    }

    private prepareRoadGeoList(): void {
        this.roadGeo$ = concat(
            of([]), // Default is an empty list
            this.roadGeoInput$.pipe(
                startWith(''),
                debounceTime(700),
                distinctUntilChanged(),
                switchMap((term: string) => {
                    if ((term && term.length >= this.matMinLength) || this.matMinLength === 0) {
                        return this.geoBCNAddressService.roads(this.roadTypeId, term).pipe(
                            map(data => data),
                            catchError(error => throwError(error)),
                        );
                    }
                    if (this.roadGeoData) {
                        if (this.multiple) {
                            return of(this.roadGeoData);
                        }
                        return of([this.roadGeoData]);
                    }
                    return of([]);
                })
            )
        );
    }

}

