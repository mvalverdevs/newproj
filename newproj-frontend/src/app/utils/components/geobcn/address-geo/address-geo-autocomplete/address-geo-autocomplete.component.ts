import { Component, OnInit, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable, Subject, of, throwError, concat } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map, catchError } from 'rxjs/operators';
import {Address} from '../../../../../../apigeo/defs/Address';
import {GeoBCNAddressService} from '../../../../../../apigeo/controllers/Address';

@Component({
    selector: 'app-address-geo-autocomplete',
    templateUrl: './address-geo-autocomplete.component.html',
    styleUrls: ['./address-geo-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AddressGeoAutocompleteComponent),
            multi: true
        }
    ]
})
export class AddressGeoAutocompleteComponent implements OnInit, ControlValueAccessor {

    addressGeo: any;
    addressGeoData: any;
    modelAddressGeo: any;

    addressGeo$: Observable<Address[]>;
    addressGeoInput$ = new Subject<string>();
    addressGeoLoading = false;

    @Input('data')
    set data(value: Address[]) {
        this.addressGeoData = value;
    }

    @Input() multiple: boolean;
    @Input() placeholder: string;
    @Input() required: boolean;
    @Input() serverErrors: any;
    @Input() control: any;
    @Input() matMinLength: number;
    @Input() roadId: any;
    @Input('road')
    set road(value: any) {
      this.roadId = value;
      this.prepareAddressGeoList();
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

    setAddressGeo(node): void {
        if (node) {
            if (this.multiple) {
                this.addressGeo = [];
                for (const i in node) {
                  if (node[i]){
                    this.addressGeo.push(node[i]);
                  }
                }
            } else {
                if (node.districtePostal){
                    node.zip_code = '080' + node.districtePostal;
                }
                if (node.localitzacio){
                    node.coordinates = {
                        type: 'GeometryCollection',
                        geometries: [{
                            type: 'Point',
                            coordinates: [node.localitzacio.x, node.localitzacio.y]
                        }]
                  };
                }
                this.addressGeo = node;
            }
        } else {
            this.addressGeo = {};
        }
        this.emit.emit(this.addressGeo);
        this.propagateChange(this.addressGeo);
        this.change.emit();
    }

    propagateChange = (_: any) => {
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
          if (value.id) {
            this.addressGeo = value.id.toString();
            this.modelAddressGeo = value.id.toString();
          }else{
            this.addressGeo = {};
            this.modelAddressGeo = {};
          }
        } else {
            if (this.multiple) {
                this.addressGeo = [];
                this.modelAddressGeo = [];
            }
        }
    }

    registerOnChange(fn): void {
        this.propagateChange = fn;
    }

    registerOnTouched(): void {
    }

    private prepareAddressGeoList(): void {
        this.addressGeo$ = concat(
            of([]), // Default is an empty list
            this.addressGeoInput$.pipe(
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
                    if (this.addressGeoData) {
                        if (this.multiple) {
                            return of(this.addressGeoData);
                        }
                        return of([this.addressGeoData]);
                    }
                    return of([]);
                })
            )
        );
    }

}

