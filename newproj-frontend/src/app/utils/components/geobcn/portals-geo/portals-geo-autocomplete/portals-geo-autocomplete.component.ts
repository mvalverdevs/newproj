import { Component, OnInit, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable, Subject, of, throwError, concat } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map, catchError } from 'rxjs/operators';
import {GeoBCNAddressService} from '../../../../../../apigeo/controllers/Address';

@Component({
    selector: 'app-portals-geo-autocomplete',
    templateUrl: './portals-geo-autocomplete.component.html',
    styleUrls: ['./portals-geo-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PortalsGeoAutocompleteComponent),
            multi: true
        }
    ]
})
export class PortalsGeoAutocompleteComponent implements OnInit, ControlValueAccessor {

    portalsGeo: any;
    portalsGeoData: any;
    modelPortalsGeo: any;

    portalsGeo$: Observable<any[]>;
    portalsGeoInput$ = new Subject<string>();
    portalsGeoLoading = false;

    @Input('data')
    set data(value: any[]) {
        this.portalsGeoData = value;
    }

    @Input() multiple: boolean;
    @Input() placeholder: string;
    @Input() required: boolean;
    @Input() serverErrors: any;
    @Input() control: any;
    @Input() portalsValue: any;
    @Input() matMinLength: number;

    @Output()
    emit = new EventEmitter<any>();

    @Output()
    change = new EventEmitter<void>();
    @Input() roadId: any;
    @Input('road')
    set road(value: any) {
        this.roadId = value;
        this.preparePortalsGeoList();
    }
    constructor(public geoBCNAddressService: GeoBCNAddressService) { }

    ngOnInit(): void {
        this.preparePortalsGeoList();
        if (!this.matMinLength && this.matMinLength !== 0) {
            this.matMinLength = 1;
        }
    }

    setPortalsGeo(node): void {
        if (node) {
            if (this.multiple) {
                this.portalsGeo = [];
                for (const i in node) {
                  if (node[i]){
                    this.portalsGeo.push(node[i].id);
                  }
                }
            } else {
                this.portalsGeo = node.id;
                this.portalsValue.patchValue({house_number_value: node.numeracioPostal});

            }
        } else {
            this.portalsGeo = {};
        }
        this.emit.emit(this.portalsGeo);
        this.propagateChange(this.portalsGeo);
        this.change.emit();
    }

    propagateChange = (_: any) => {
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null && value.codi) {
            this.portalsGeo = value.codi.toString();
            this.modelPortalsGeo = value.codi.toString();
        } else {
            if (this.multiple) {
                this.portalsGeo = [];
                this.modelPortalsGeo = [];
            }
        }
    }

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {
    }

    private preparePortalsGeoList(): void {
        this.portalsGeo$ = concat(
            of([]), // Default is an empty list
            this.portalsGeoInput$.pipe(
                startWith(''),
                debounceTime(700),
                distinctUntilChanged(),
                switchMap((term: string) => {
                    if ((term && term.length >= this.matMinLength) || this.matMinLength === 0) {

                        return this.geoBCNAddressService.addresses(this.roadId, term).pipe(
                            map(data => data),
                            catchError(error => throwError(error)),
                        );
                    }
                    if (this.portalsGeoData) {
                        if (this.multiple) {
                            return of(this.portalsGeoData);
                        }
                        return of([this.portalsGeoData]);
                    }
                    return of([]);
                })
            )
        );
    }

}

