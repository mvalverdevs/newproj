

import { Injectable, NgZone, ChangeDetectorRef } from '@angular/core';
import { Observable, AsyncSubject, BehaviorSubject } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { Map, View, Feature } from 'ol';
import { Vector as VectorLayer, Tile as TileLayer } from 'ol/layer';
import { TileImage, Vector as VectorSource, OSM } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import TileGrid from 'ol/tilegrid/TileGrid';
import * as conditions from 'ol/events/condition';
import * as proj from 'ol/proj';
import { register } from 'ol/proj/proj4';
import * as Geom from 'ol/geom';
import GeometryType from 'ol/geom/GeometryType';
import * as Style from 'ol/style';
import { Draw, Select, Modify, Translate, Snap, Interaction } from 'ol/interaction';
import { createBox } from 'ol/interaction/Draw';
import { ModifyEvent } from 'ol/interaction/Modify';
import proj4 from 'proj4';

import { Location } from 'apigeo/defs/Location';
import { Geometry } from 'apigeo/defs/Geometry';
import { GeoBCNAddressService, GeoBCNAddressResponse } from 'apigeo/controllers/Address';
import { CreateMapOptions, geoBCNSources, DrawInteractions, InteractionType } from '../geobcn-types';


@Injectable({
  providedIn: 'root'
})
export class GeobcnMapService {
  mapInstance: Map;               // OpenLayers Map
  satelliteLayer: TileLayer;      // Satellite Layer
  guiaLayer: TileLayer;           // PlanoBCN Layer
  vectorLayer: VectorLayer;       // VectorLayer to draw features
  hoverLayer: VectorLayer;        // VectorLayer to draw temporary features
  districtsLayer: VectorLayer;        // VectorLayer to draw temporary features
  neighborhoodsLayer: VectorLayer;        // VectorLayer to draw temporary features
  addressesLayer: VectorLayer;    // VectorLayer to draw addresses
  relatedAddressesLayer: VectorLayer;    // VectorLayer to draw addresses from related entities
  OSMLayer: TileLayer;            // TileLayer from Open Street Maps

  // Interactions
  drawInteractions: DrawInteractions;
  selectInteraction: Select;
  modifyInteraction: Modify;
  translateInteraction: Translate;
  snapInteraction: Snap;
  activeInteraction: Interaction;

  // Observable for a map creation finish event
  mapCreated$: Observable<void>;
  private mapCreated = new AsyncSubject<void>();

  // Observable for new selected addresses
  addressSelectionEnabled = false;
  addressSelectionChanged$: Observable<GeoBCNAddressResponse>;
  private addressSelectionChanged = new BehaviorSubject<GeoBCNAddressResponse>(null);

  pointSelectionChanged$: Observable<number>;
  private pointSelectionChanged = new BehaviorSubject<number>(null);

  // Observable for changes in vectorLayer
  vectorLayerChanged$: Observable<any>;
  private vectorLayerChanged = new BehaviorSubject<any>(null);

  // Observable for changes in addressLayer
  addressLayerChanged$: Observable<ModifyEvent>;
  private addressLayerChanged = new BehaviorSubject<ModifyEvent>(null);

  // Default values
  extent = [412363, 4570689, 445655, 4592357];
  resolutions = [50, 25, 16, 8, 4, 2, 1, 0.5, 0.25];
  maxZoom = this.resolutions.length - 1;
  urlTilePattern = '/{z}/{c1}/{c2}/{c3}/{r1}/{r2}/{r3}.png';
  defaultProjection = 'EPSG:25831';

  constructor(
    private zone: NgZone,
    private addressService: GeoBCNAddressService,
    private changeDetectorRef: ChangeDetectorRef,
    private geoBCNAddressService: GeoBCNAddressService,
  ) {
    this.mapCreated$ = this.mapCreated.asObservable();
    this.addressSelectionChanged$ = this.addressSelectionChanged.asObservable();
    this.pointSelectionChanged$ = this.pointSelectionChanged.asObservable();
    this.vectorLayerChanged$ = this.vectorLayerChanged.asObservable();
    this.addressLayerChanged$ = this.addressLayerChanged.asObservable();

    // Add projections defs to proj4
    proj4.defs('EPSG:25831', '+proj=utm +zone=31 +ellps=GRS80 +units=m +no_defs');
    proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');
    proj4.defs('EPSG:23031', '+title=ED50 / UTM zone 31N +proj=utm +zone=31 +ellps=intl +units=m +towgs84=-87,-98,-121,0,0,0,0');

    // Register proj4 library
    register(proj4);
  }

  /**
   * Transform coordinates from sourceEPSG projection to destEPSG projection
   *
   * @private
   * @param {string} sourceEPSG The Source Coordinate Projection System
   * @param {string} destEPSG The Destination Coordinate Projection System
   * @param {number} coordX X Coordinate
   * @param {number} coordY Y Coordinete
   * @returns {number[]} An array containing the two projected coordinates
   */
  static coordinateProjection(sourceEPSG: string, destEPSG: string, coordX: number, coordY: number): number[] {
    const sourceTresor = sourceEPSG.indexOf('TRESOR') >= 0;
    const destTresor = destEPSG.indexOf('TRESOR') >= 0;
    function ED502Tresor(arrCoords: number[]): number[] {
      return [((arrCoords[0] - 400000.0)), ((arrCoords[1] - 4500000.0))];
    }
    function tresor2ED50(arrCoords): number[] {
      return [((arrCoords[0] / 1000.0) + 400000.0), ((arrCoords[1] / 1000.0 + 4500000.0))];
    }

    try {
      if ((sourceEPSG && destEPSG) && (sourceEPSG !== destEPSG)) {
        const src = proj4.Proj(sourceTresor ? 'EPSG:23031' : sourceEPSG);
        const dst = proj4.Proj(destTresor ? 'EPSG:23031' : destEPSG);
        const sourceCoords = sourceTresor ? tresor2ED50([coordX, coordY]) : [coordX, coordY];
        const point = proj4.toPoint([sourceCoords[0], sourceCoords[1]]);
        const transformedPoint = proj4.transform(src, dst, point);
        return destTresor ? ED502Tresor([transformedPoint.x, transformedPoint.y]) : [transformedPoint.x, transformedPoint.y];
      } else {
        return [coordX, coordY];
      }
    } catch (exc) {
    }
  }


  static getLocation(entity): string[] {
    if (entity && entity.addresses && entity.addresses.length > 0) {
      if (entity.addresses[0].related_entity
        && entity.addresses[0].related_entity_data['addresses'][0]
        && entity.addresses[0].related_entity_data['addresses'][0].location_picture) {
        return entity.addresses[0].related_entity_data['addresses'][0].location_picture.geometries[0].coordinates;
      } else if (entity.addresses[0].related_entity
        && entity.addresses[0].related_entity_data['addresses'][0]
        && entity.addresses[0].related_entity_data['addresses'][0].location) {
        return entity.addresses[0].related_entity_data['addresses'][0].location.geometries[0].coordinates;
      } else if (entity.addresses[0].location_picture) {
        return entity.addresses[0].location_picture.geometries[0].coordinates;
      } else if (entity.addresses[0].location) {
        return entity.addresses[0].location.geometries[0].coordinates;
      }
    }
    return null;
  }

  static getAddressUrl(entity): string {
    let url = null;
    const coordinates = GeobcnMapService.getLocation(entity);

    if (coordinates && coordinates.length === 2) {
      const projCoords = GeobcnMapService.coordinateProjection('EPSG:25831', 'EPSG:4326', parseFloat(coordinates[0]), parseFloat(coordinates[1]));
      url = 'https://com-shi-va.barcelona.cat/ca/planifica_la_teva_ruta?desde=&hasta=' + projCoords[1] + ',' + projCoords[0] + '&RadioGroup1=TRANSIT';
    }

    return url;
  }

  static getGuideMapUrl(entity): string {
    let url = null;
    const coordinates = GeobcnMapService.getLocation(entity);
    let address: any = null;

    if (coordinates && coordinates.length === 2) {
      const projCoords = GeobcnMapService.coordinateProjection('EPSG:25831', 'TRESOR', parseFloat(coordinates[0]), parseFloat(coordinates[1]));
      if (entity.addresses[0].related_entity) {
        address = entity.addresses[0].related_entity_data['addresses'][0];
      } else {
        address = entity.addresses[0];
      }
      url = 'http://w20.bcn.cat/guiamap/default.aspx?z=5'
        + '&x=' + projCoords[0] + '&y=' + projCoords[1]
        + '&p=' + projCoords[0] + ',' + projCoords[1]
        + '&t1=' + entity.name
        + '&t2=' + address.roadtype_name + ' ' + address.address_name + ' ' + address.start_street_number
        + '&ant=1';
    }

    return url;
  }

  /**
   * Configure OpenLayers and create the map
   *
   * @param {CreateMapOptions} options The options to configure the map
   * @param {boolean} readOnly If true, all interactions are disabled
   */
  setup(options: CreateMapOptions, readOnly: boolean): void {
    this.zone.onStable.pipe(first()).subscribe(() => {
      this.createMap(options);
      if (!readOnly) {
        this.createDrawInteractions();
        this.createEditInteractions();
        this.configureEvents();
      } else {
        this.createEventInteractions();
      }

      this.zone.run(() => {
        this.mapCreated.next(undefined);
        this.mapCreated.complete();
        this.changeDetectorRef.detectChanges();
      });

    });
  }

  /**
   * Toggle between Satellite Mode / Map Mode
   */
  toggleSatellite(): void {
    this.satelliteLayer.setVisible(!this.satelliteLayer.getVisible());
    this.guiaLayer.setVisible(!this.guiaLayer.getVisible());
  }

  /**
   * Activate Address selection mode
   */
  setAddressSelection(enabled: boolean): void {
    this.addressSelectionEnabled = enabled;
    this.setActiveEditing(!enabled);
  }

  /**
   * Enables an interaction
   *
   * @param {InteractionType} type The interaction type to enable
   */
  enableInteraction(type: InteractionType): void {
    // If we click an active interaction we disable it
    if (this.activeInteraction) {
      this.activeInteraction.setActive(false);
    }
    // Enable selected interaction
    this.activeInteraction = this.drawInteractions[type];
    this.setActiveEditing(!this.activeInteraction);
    if (this.activeInteraction) {
      this.activeInteraction.setActive(true);
    }

    this.addressSelectionEnabled = false;
  }

  /**
   * Remove all selected features from the vectorLayer
   */
  deleteSelectedFeature(): boolean {
    const selFeatures = this.selectInteraction.getFeatures();
    const that = this;

    let result = true;

    if (selFeatures) {
      selFeatures.forEach(feature => {
        const id = feature.getId();
        if (id !== undefined) {
          result = false;
        } else {
          this.vectorLayer.getSource().removeFeature(feature);
        }
      });
      selFeatures.clear();

      setTimeout(() => that.vectorLayerChanged.next(that.getGeoJSON()), 200);
    }

    return result;
  }

  /**
   * Add a geometry to the hoverLayer
   *
   * @param {Geometry} geometry The geometry
   * @memberof GeobcnMapService
   */
  addHoverGeometry(geometry: Geometry): void {
    const feature = new Feature();

    switch (geometry.type) {
      case 'Polygon':
        const p = new Geom.Polygon(geometry.coordinates);
        feature.setGeometry(p);
        feature.setGeometryName('geometry');
        feature.setId('id');
        break;
      case 'Point':
        break;
    }
    this.hoverLayer.getSource().addFeature(feature);
  }

  /**
   * Add a marker to the hoverLayer
   */
  addHoverMarker(location: Location): void {
    const feature = new Feature({
      geometry: new Geom.Point([location.x, location.y]),
    });

    this.hoverLayer.getSource().addFeature(feature);
  }

  /**
   * Clear all geometries from the hover layer
   */
  clearHoverGeometry(): void {
    this.hoverLayer.getSource().clear(true);
  }

  /**
   * Get an Object with a GeometryCollection containing all geometries from the vectorLayer
   *
   * @returns {*} an Object containing the geometries in geoJSON Format
   */
  getGeoJSON(): any {
    const geoParser = new GeoJSON();
    const features = this.vectorLayer.getSource().getFeatures();
    const geoString = geoParser.writeFeatures(features);
    const geoFeatureCollection = JSON.parse(geoString);

    // Transform feature collection into geometry collection
    const geoGeometryCollection = { type: 'GeometryCollection', geometries: [] };
    if (geoFeatureCollection.features) {
      geoFeatureCollection.features.forEach(feature => geoGeometryCollection.geometries.push(feature.geometry));
    }
    return geoGeometryCollection;
  }

  /**
   * Add features coming from a geoJSON object to a layer
   *
   * @param {*} geoJSONData The geoJSON data to add
   * @param {VectorLayer} vectorLayer The layer where the geometries will be added to
   * @param {string} id An optional Id for the features
   */
  addFeatures(geoJSONData: any, vectorLayer: VectorLayer, id: number, name?: string): void {
    if (geoJSONData && vectorLayer) {
      const geoFeatureCollection = { type: 'FeatureCollection', features: [] };
      if (geoJSONData.geometries) {
        geoJSONData.geometries.forEach(geometry => geoFeatureCollection.features.push({
          type: 'Feature',
          geometry: geometry
        }));
      }

      const geoParser = new GeoJSON();
      const features = geoParser.readFeatures(geoFeatureCollection);
      if (id) {
        features.forEach(feature => feature.setId(id));
      }
      if (name) {
        features.forEach(feature => feature['name'] = name);
      }
      vectorLayer.getSource().addFeatures(features);
    }
  }

  /**
   * Clear the vectorLayer and add the features provided in geoJSONData
   *
   * @param {*} geoJSONData The features to add
   */
  setGeoJSON(geoJSONData: any): void {
    this.vectorLayer.getSource().clear();
    this.addFeatures(geoJSONData, this.vectorLayer, null);
  }

  /**
   * Clear the addressesLayer and add the addresses provided in addreses
   *
   * @param {Address[]} addresses Array with the addresses to add
   */
  setAddresses(addresses: any[], relatedEntityAddressesData?: any): void {
    this.addressesLayer.getSource().clear();
    this.relatedAddressesLayer.getSource().clear();

    addresses.forEach(address => {
      if (!address.hide_landmark) {
        if (address.related_entity) {
          let addr;
          if (address.related_entity_data && address.related_entity_data['addresses'][0]) {
            addr = address.related_entity_data['addresses'][0];
          } else {
            addr = relatedEntityAddressesData[address.related_entity].addresses[0];
          }

          if (addr.location_picture && addr.location_picture.type) {
            this.addFeatures(addr.location_picture, this.relatedAddressesLayer, addr.id);
          } else {
            this.addFeatures(addr.location, this.relatedAddressesLayer, addr.id);
          }

        } else {
          if (address.location_picture && address.location_picture.type) {
            this.addFeatures(address.location_picture, this.addressesLayer, address.id);
          } else {
            this.addFeatures(address.coordinates, this.addressesLayer, address.start_number_id);
          }
        }



      }
    });
  }

  //
  // Private methods
  //

  loadDistricts(): void {
    this.geoBCNAddressService.districts('').pipe(
      tap(result => {
        result.forEach(distrct => {
          this.addFeatures(
            { geometries: [distrct.geometria]},
            this.districtsLayer,
            0,
            distrct.descripcio);
        });
      })
    ).subscribe();

  }

  loadNeighborhoods(): void {
    this.geoBCNAddressService.neighborhoods('', '').pipe(
      tap(result => {
        result.forEach(neighborhood => {
          this.addFeatures({geometries: [neighborhood.geometria]}, this.neighborhoodsLayer, 0, neighborhood.nom);
        });
      })
    ).subscribe();

  }

  /**
   * Initialize open layers with the options provided
   * Create projections
   * Create layers
   *
   * @private
   * @param {CreateMapOptions} options Options to initialize open layers
   * @memberof GeobcnMapService
   */
  private createMap(options: CreateMapOptions): void {


    // Configure projection extents
    const projection = proj.get(this.defaultProjection);
    projection.setExtent([238379.2278, 4265559.3497, 761620.7722, 6914547.3835]);
    proj.get('EPSG:4326').setExtent([-180.0000, -90.0000, 180.0000, 90.0000]);
    proj.get('EPSG:23031').setExtent([238730.0252, 4276730.7754, 761269.9748, 7434723.1222]);

    // Initialize OpenLayers
    // Create map
    const sources = geoBCNSources.map(e => e.codi);

    this.guiaLayer = this.getBaseLayer(geoBCNSources[sources.indexOf('PLANOLBCN')], true);
    this.satelliteLayer = this.getBaseLayer(geoBCNSources[sources.indexOf('SAT')], false);

    this.OSMLayer = new TileLayer({
      preload: 4,
      source: new OSM()
    });

    // Add a vector layer to draw features
    this.vectorLayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style.Style({
        fill: new Style.Fill({
          color: 'rgba(255, 0, 0, 0.1)',
        }),
        stroke: new Style.Stroke({
          color: '#cc0c2f',
          width: 2
        }),
        image: new Style.Circle({
          radius: 6,
          stroke: new Style.Stroke({
            color: 'white',
            width: 2
          }),
          fill: new Style.Fill({
            color: '#cc0c2f'
          })
        })
      })
    });

    // Add a vector layer to draw addresses
    this.addressesLayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style.Style({
        fill: new Style.Fill({
          color: 'rgba(255, 0, 200, 0.1)',
        }),
        stroke: new Style.Stroke({
          color: '#cc0caf',
          width: 2
        }),
        image: new Style.Circle({
          radius: 6,
          stroke: new Style.Stroke({
            color: 'white',
            width: 2
          }),
          fill: new Style.Fill({
            color: '#cc0caf'
          })
        })
      })
    });

    // Add a vector layer to draw addresses from related entities
    this.relatedAddressesLayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style.Style({
        fill: new Style.Fill({
          color: 'rgba(100, 100, 100, 0.1)',
        }),
        stroke: new Style.Stroke({
          color: '#666666',
          width: 2
        }),
        image: new Style.Circle({
          radius: 6,
          stroke: new Style.Stroke({
            color: 'white',
            width: 2
          }),
          fill: new Style.Fill({
            color: '#666666'
          })
        })
      })
    });


    // Add a vector layer for temporary drawings of addresses
    this.hoverLayer = new VectorLayer({
      source: new VectorSource(),
      style: new Style.Style({
        fill: new Style.Fill({
          color: 'rgba(255, 0, 200, 0.1)',
        }),
        stroke: new Style.Stroke({
          color: '#cc0caf',
          width: 2
        }),
        image: new Style.Circle({
          radius: 6,
          stroke: new Style.Stroke({
            color: 'white',
            width: 2
          }),
          fill: new Style.Fill({
            color: '#cc0caf'
          })
        })
      })
    });

    // Add a vector layer to draw addresses from related entities
    function districtStyleFunction(feature, resolution): Style.Style {

      return new Style.Style({
        stroke: new Style.Stroke({
          color: '#FF6666',
          width: 2
        }),
        text: new Style.Text({
          text: (resolution >= 4 ) ? feature['name'] : '',
          overflow: true,
          fill: new Style.Fill({
            color: '#FF6666',
          }),
          stroke: new Style.Stroke({
            color: '#ffffff',
            width: 1
          }),
          font: 'bold 18px sans-serif'

        })
      });
    }
    this.districtsLayer = new VectorLayer({
      source: new VectorSource(),
      style: districtStyleFunction
    });

    this.loadDistricts();

    // Add a vector layer to draw addresses from related entities
    function neighborhoodStyleFunction(feature, resolution): Style.Style {
      return new Style.Style({
        stroke: new Style.Stroke({
          color: '#666666',
          width: 1
        }),
        text: new Style.Text({
          text: (resolution <= 4 && resolution >= 2 ) ? feature.name : '',
          overflow: true,
          fill: new Style.Fill({
            color: '#666666',
          }),
          stroke: new Style.Stroke({
            color: '#ffffff',
            width: 1
          }),
          font: 'bold 18px sans-serif'

        })
      });
    }
    this.neighborhoodsLayer = new VectorLayer({
      source: new VectorSource(),
      style: neighborhoodStyleFunction
    });

    this.loadNeighborhoods();

    // Create view
    const view = new View({
      projection: projection,
      resolutions: this.resolutions,
      zoom: 2,
      center: [430916, 4583697],
      rotation: 44.29 * 0.0174532925,
      // extent: this.extent
    });

    // Initialize map
    this.mapInstance = new Map({
      target: options.target,
      layers: [
        this.OSMLayer,
        // this.districtsLayer,
        // this.neighborhoodsLayer,
        this.vectorLayer,
        this.addressesLayer,
        this.relatedAddressesLayer,
        this.hoverLayer,
        this.satelliteLayer,
        this.guiaLayer
      ],
      view: view,
      controls: []
    });

    // Order layers

    this.addressesLayer.setZIndex(999);
    this.vectorLayer.setZIndex(999);
    this.hoverLayer.setZIndex(998);
    this.relatedAddressesLayer.setZIndex(991);
    this.districtsLayer.setZIndex(803);
    this.neighborhoodsLayer.setZIndex(802);
    this.guiaLayer.setZIndex(801);
    this.satelliteLayer.setZIndex(801);
    this.OSMLayer.setZIndex(800);
  }

  /**
   * Initialize draw interactions
   * @private
   */
  private createDrawInteractions(): void {
    const that = this;
    function onDrawEnd() {
      setTimeout(function() {
        that.setActiveEditing(true);
        that.activeInteraction.setActive(false);
        const geo = that.getGeoJSON();
        that.vectorLayerChanged.next(geo);
      });
    }

    // Draw interactions
    const pointInteraction = new Draw({
      type: GeometryType.POINT,
      source: this.vectorLayer.getSource()
    });
    pointInteraction.setActive(false);
    pointInteraction.on('drawend', onDrawEnd);

    const lineInteraction = new Draw({
      type: GeometryType.LINE_STRING,
      source: this.vectorLayer.getSource()
    });
    lineInteraction.setActive(false);
    lineInteraction.on('drawend', onDrawEnd);

    const polygonInteraction = new Draw({
      type: GeometryType.POLYGON,
      source: this.vectorLayer.getSource()
    });
    polygonInteraction.setActive(false);
    polygonInteraction.on('drawend', onDrawEnd);

    const circleInteraction = new Draw({
      type: GeometryType.CIRCLE,
      source: this.vectorLayer.getSource()
    });
    circleInteraction.setActive(false);
    circleInteraction.on('drawend', onDrawEnd);

    const rectangleInteraction = new Draw({
      type: GeometryType.CIRCLE,
      source: this.vectorLayer.getSource(),
      geometryFunction: createBox()
    });
    rectangleInteraction.setActive(false);
    rectangleInteraction.on('drawend', onDrawEnd);

    this.drawInteractions = {
      point: pointInteraction,
      line: lineInteraction,
      polygon: polygonInteraction,
      circle: circleInteraction,
      rectangle: rectangleInteraction
    };

    this.mapInstance.getInteractions().extend([
      pointInteraction, lineInteraction, polygonInteraction,
      circleInteraction, rectangleInteraction]);

  }

  /**
   * Initialize edit interactions
   *
   * @private
   */
  private createEditInteractions(): void {
    const that = this;
    function onEditEnd(a: ModifyEvent) {
      const id = a.features.item(0).getId();
      setTimeout(function() {
        if (id !== null) {
          that.addressLayerChanged.next(a);
        } else {
          that.vectorLayerChanged.next(that.getGeoJSON());
        }
      }, 200);
    }


    this.selectInteraction = new Select({
      condition: conditions.click,
      wrapX: false,
      layers: [this.vectorLayer, this.addressesLayer]
    });
    this.modifyInteraction = new Modify({
      features: this.selectInteraction.getFeatures()
    });
    this.translateInteraction = new Translate({
      features: this.selectInteraction.getFeatures()
    });
    this.snapInteraction = new Snap({
      source: this.vectorLayer.getSource()
    });

    this.modifyInteraction.on('modifyend', onEditEnd);
    this.translateInteraction.on('translateend', onEditEnd);

    this.setActiveEditing(true);

    this.mapInstance.getInteractions().extend([
      this.selectInteraction, this.translateInteraction, this.modifyInteraction,
      this.snapInteraction]);
  }

  /**
   * Initialize edit interactions
   *
   * @private
   */
  private createEventInteractions(): void {

    this.selectInteraction = new Select({
      condition: conditions.click,
      wrapX: false,
      layers: [this.addressesLayer, this.relatedAddressesLayer]
    });

    this.selectInteraction.on('select', evt => {
      if (evt.selected.length > 0 ){
        this.pointSelectionChanged.next(parseInt(evt.selected[0].getId().toString(), 10));
      } else {
        this.pointSelectionChanged.next(null);
      }

    });

    this.mapInstance.getInteractions().extend([this.selectInteraction]);
  }

  /**
   * Add click event
   * When the user click in the map, if addressSelectionEnabled is true,
   * get the list of nearest addresses and emit the addressSelectionChanged event
   *
   * @private
   * @memberof GeobcnMapService
   */
  private configureEvents(): void {
    this.mapInstance.on('singleclick', evt => {
      if (this.addressSelectionEnabled) {
        const coords = GeobcnMapService.coordinateProjection(this.defaultProjection, 'EPSG:25831', evt.coordinate[0], evt.coordinate[1]);

        this.zone.run(() => {
          this.addressService.listBySpatialQuery({ x: coords[0], y: coords[1], max: 8, radi: 40, geometria: true, proj: 'EPSG:25831' }).pipe(
            tap(response => {
              this.addressSelectionChanged.next(response);
              this.setAddressSelection(false);
              this.changeDetectorRef.detectChanges();
            })
          ).subscribe();
        });

      }
    });
  }

  /**
   * Enable/disable modify interactions
   */
  private setActiveEditing(active: boolean): void {
    this.selectInteraction.getFeatures().clear();
    this.selectInteraction.setActive(active);
    this.modifyInteraction.setActive(active);
    this.translateInteraction.setActive(active);
  }

  /**
   * Configure geoBCN Tile Layers
   *
   * @private
   * @param {*} baseLayer The layer configuration
   * @param {boolean} visibility If the layer will be visible or not
   * @returns {TileLayer} A new TileLayer with the baseLayer configuration
   */
  private getBaseLayer(baseLayer, visibility: boolean): TileLayer {
    const projection = proj.get(baseLayer.projeccio.codiApi);

    function zeroPad(num, places) {
      const zero = places - num.toString().length + 1;
      return (Array(+(zero > 0 && zero)).join('0') + num).toString().slice(-places);
    }

    const that = this;

    const layer = new TileLayer({
      preload: Infinity,
      visible: visibility,
      extent: baseLayer.extent,
      source: new TileImage({
        crossOrigin: 'anonymous',
        projection: projection,
        tileGrid: new TileGrid({
          origin: [baseLayer.origenX, baseLayer.origenY],
          resolutions: baseLayer.resolucions
        }),
        tileUrlFunction: function(tileCoord, pixelRatio, projection) {
          if (tileCoord[1] < 0 || tileCoord[2] < 0) {
            return '';
          }
          const xPadded = zeroPad(tileCoord[1], 9);
          const yPadded = zeroPad(tileCoord[2], 9);
          const zPadded = zeroPad(tileCoord[0], 2);
          const url = that.urlTilePattern
            .replace('{z}', zPadded)
            .replace('{c1}', xPadded.slice(0, 3))
            .replace('{c2}', xPadded.slice(3, 6))
            .replace('{c3}', xPadded.slice(6, 9))
            .replace('{r1}', yPadded.slice(0, 3))
            .replace('{r2}', yPadded.slice(3, 6))
            .replace('{r3}', yPadded.slice(6, 9));
          return baseLayer.url + url;
        }
      })
    });

    return layer;
  }


}
