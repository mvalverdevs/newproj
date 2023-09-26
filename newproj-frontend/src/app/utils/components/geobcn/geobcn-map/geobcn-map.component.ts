import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, ChangeDetectorRef, NgZone, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { tap, takeUntil, take } from 'rxjs/operators';
import * as _ from 'lodash';
import { Point } from 'ol/geom';

import { Address } from 'apigeo/defs/Address';
import { Island } from 'apigeo/defs/Island';
import { Neighborhood } from 'apigeo/defs/Neighborhood';
import { Location } from 'apigeo/defs/Location';
import { Geometry } from 'apigeo/defs/Geometry';
import { District } from 'apigeo/defs/District';

import { GeobcnMapService } from './geobcn-map.service';
import * as geoTypes from '../geobcn-types';
import {MatDrawer} from '@angular/material/sidenav';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'geobcn-map',
  templateUrl: './geobcn-map.component.html',
  styleUrls: ['./geobcn-map.component.scss'],
  providers: [
    GeobcnMapService
  ],
})
export class GeobcnMapComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  addressSelectionEnabled = false;
  protected unsubscribe$: Subject<void> = new Subject();

  InteractionType = geoTypes.InteractionType;

  selectedAddress = null;

  addresses: Address[] = null;              // Address selection info

  @Input() activated: boolean;              // Indicates if the maps is currently visible or not
  @Input() geoJSONField: FormGroup;         // The geoJSON field to save map drawings
  @Input() geoJSON: any;                    // Un geoJSON para inicializar las geometrías del mapa
  @Input() entityAddresses: any[];         // An Array of addresses to initialize the map with
  @Input() addressesField: FormArray;       // The address field to save addresses
  @Input() readOnly = false;                // If true, all interactions will be disabled
  @Input() relatedEntityAddressesData = {}; // (option) Data from related entity addresses

  @Output() addressSelectionChanged = new EventEmitter<any>();
  @Output() addressIdSelectionChanged = new EventEmitter<any>();

  @ViewChild('container', { static: false }) div: ElementRef;
  @ViewChild('drawer', { static: false }) drawer: MatDrawer;

  constructor(
    private zone: NgZone,
    private mapService: GeobcnMapService,
    private changeDetectorRef: ChangeDetectorRef,
    private snackbar: MatSnackBar) {

  }

  ngOnInit(): void {
    if (this.geoJSONField) {
      this.geoJSON = this.geoJSONField.value;
    }

    // Initialize map
    this.mapService.mapCreated$.pipe(
      take(1),
      tap(() => {
        this.mapService.setGeoJSON(this.geoJSON);
        this.mapService.setAddresses(this.entityAddresses, this.relatedEntityAddressesData);
      })
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // If the map becomes visible, we need to call updateSize to refresh the screen
    if (changes.activated) {
      setTimeout(() => {
        this.mapService.mapInstance.updateSize();
      });
    }
    // If there is change in entityAddresses, reset the map with the new value
    if (changes.entityAddresses) {
      if (!changes.entityAddresses.isFirstChange()) {
        this.mapService.setAddresses(changes.entityAddresses.currentValue, this.relatedEntityAddressesData);
      }
    }
  }

  ngAfterViewInit(): void {
    this.mapService.setup({
      target: this.div.nativeElement,
      sources: [geoTypes.SourceType.Satellite, geoTypes.SourceType.Guia]
    }, this.readOnly);

    // On Address selection show search results
    this.mapService.addressSelectionChanged$.pipe(
      takeUntil(this.unsubscribe$),
      tap(address => {
        if (address) {
          this.zone.run(() => {
            this.addresses = address.resultats;
            this.drawer.open();
          });
        }
        this.addressSelectionEnabled = false;
      })
    ).subscribe();

    this.mapService.pointSelectionChanged$.pipe(
      takeUntil(this.unsubscribe$),
      tap(address => {
        this.addressIdSelectionChanged.emit(address);
      })
    ).subscribe();

    // On drawing, propagate change to formControl
    this.mapService.vectorLayerChanged$.pipe(
      tap(geoJSON => {
        if (geoJSON) {
          this.geoJSONField.reset();
          for (const _geometry of geoJSON.geometries) {
            const fg = new FormGroup({
              type: new FormControl({ value: undefined, disabled: false }, [Validators.required]),
              coordinates: new FormControl([], [Validators.required]),
            }, []);
            (this.geoJSONField.controls['geometries'] as FormArray).controls.push(fg);
          }
          this.geoJSONField.patchValue(geoJSON);
        }
      })
    ).subscribe();


    // On change address position
    this.mapService.addressLayerChanged$.pipe(
      tap(event => {
        if (event) {
          const id = event.features.item(0).getId();
          const newPos = event.features.item(0).getGeometry() as Point;

          // Look for the affected address
          const addresses = this.addressesField.value.reduce((obj, elm, counter) => { obj[elm.address_id] = this.addressesField.controls[counter]; return obj; }, {});

          if (addresses[id]) {
            const geoJSONField: FormControl = addresses[id].controls['location_picture'];
            geoJSONField.reset();
            (geoJSONField['controls']['geometries'] as FormArray).controls = [];

            const fg = new FormGroup({
              type: new FormControl({value: undefined, disabled: false}, [Validators.required]),
              coordinates: new FormControl([], [Validators.required]),
            }, []);
            (geoJSONField['controls']['geometries'] as FormArray).controls.push(fg);

            geoJSONField.patchValue({
              type: 'GeometryCollection',
              geometries: [{
                type: 'Point',
                coordinates: [newPos.getCoordinates()[0], newPos.getCoordinates()[1]]
              }]
            });
          }

        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * After selecting a district emit an addressSelectionChanged event with the new district
   *
   * @param {District} district
   */
  selectDistrict(district: District): void {
    this.addressSelectionChanged.emit({ districte: district });
    this.drawer.close();
  }

  /**
   * After selecting a neighborhood emit an addressSelectionChanged event with the new neighborhood
   *
   * @param {District} district
   * @param {Neighborhood} neighborhood
   */
  selectNeighbourghood(district: District, neighborhood: Neighborhood): void {
    this.addressSelectionChanged.emit({ districte: district, barri: neighborhood });
    this.drawer.close();
  }

  /**
   * After selecting an insland emit an addressSelectionChanged event with the new island
   *
   * @param {District} district
   * @param {Neighborhood} neighborhood
   * @param {Island} island
   */
  selectIsland(district: District, neighborhood: Neighborhood, island: Island): void {
    this.addressSelectionChanged.emit({ districte: district, barri: neighborhood, illa: island });
    this.drawer.close();
  }

  /**
   * After selecting an address emit an addressSelectionChanged event with the new address
   */
  selectAddress(address: Address): void {
    this.addressSelectionChanged.emit(address);
    this.drawer.close();
  }

  /**
   * Add a new geometry to the map hoverLayer
   *
   * @param {MouseEvent} evt
   * @param {Geometry} geom
   * @memberof GeobcnMapComponent
   */
  drawGeometry(evt: MouseEvent, geom: Geometry): void {
    this.mapService.addHoverGeometry(geom);
  }

  /**
   * Add a new marker to the map hoverLayer
   */
  drawMarker(evt: MouseEvent, location: Location): void {
    this.mapService.addHoverMarker(location);
  }

  /**
   * Clear all features from the hoverLayer
   *
   * @param {MouseEvent} evt
   */
  clearAllFeatures(evt: MouseEvent): void {
    this.mapService.clearHoverGeometry();
  }

  /**
   * Toggles satellite view
   *
   */
  toggleSatellite(): void {
    this.mapService.toggleSatellite();
  }

  /**
   * Enable indicated interaction in the map
   *
   * @param {geoTypes.InteractionType} type The interaction to enable
   */
  enableInteraction(type: geoTypes.InteractionType): void {
    this.mapService.enableInteraction(type);
    this.addressSelectionEnabled = false;
  }

  /**
   * Removes the currently selected feature from the map
   *
   * @memberof GeobcnMapComponent
   */
  deleteSelectedFeature(): void {
    // We can only remove drawing features, not addresses
    if (!this.mapService.deleteSelectedFeature()) {
      this.snackbar.open(`No es pot eliminar adreces des d'aquest botó.
      Per eliminar la adreça, premi el botó eliminar a la llista d'adreces..`, 'Tancar', { panelClass: 'error' });
    }

    this.addressSelectionEnabled = false;
  }

  /**
   * Toggle address selection
   *
   */
  toggleAddressSelection(): void {
    this.addressSelectionEnabled = !this.addressSelectionEnabled;
    this.mapService.setAddressSelection(this.addressSelectionEnabled);
  }

}
