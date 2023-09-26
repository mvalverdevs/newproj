import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeoBCNAPIModule} from '../../../../apigeo/geobcn.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BCNSharedModule} from '../../../../@bcn/shared.module';
import {
    NeighborhoodGeoAutocompleteComponent
} from './neighborhood-geo/neighborhood-geo-autocomplete/neighborhood-geo-autocomplete.component';
import {NeighborhoodGeoFormComponent} from './neighborhood-geo/neighborhood-geo-form/neighborhood-geo-form.component';
import {
    DistrictGeoAutocompleteComponent
} from './district-geo/district-geo-autocomplete/district-geo-autocomplete.component';
import {DistrictGeoFormComponent} from './district-geo/district-geo-form/district-geo-form.component';
import {
    RoadtypeGeoAutocompleteComponent
} from './roadtype-geo/roadtype-geo-autocomplete/roadtype-geo-autocomplete.component';
import {RoadtypeGeoFormComponent} from './roadtype-geo/roadtype-geo-form/roadtype-geo-form.component';
import {RoadGeoAutocompleteComponent} from './road-geo/road-geo-autocomplete/road-geo-autocomplete.component';
import {RoadGeoFormComponent} from './road-geo/road-geo-form/road-geo-form.component';
import {
    AddressGeoAutocompleteComponent
} from './address-geo/address-geo-autocomplete/address-geo-autocomplete.component';
import {AddressGeoFormComponent} from './address-geo/address-geo-form/address-geo-form.component';
import {GeobcnMapComponent} from './geobcn-map/geobcn-map.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {NgSelectModule} from "@ng-select/ng-select";
import {BCNErrorComponent} from "../../../../@bcn/components/bcn-error/bcn-error.component";
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
    declarations: [
        GeobcnMapComponent,
        NeighborhoodGeoAutocompleteComponent,
        NeighborhoodGeoFormComponent,
        DistrictGeoAutocompleteComponent,
        DistrictGeoFormComponent,
        RoadtypeGeoAutocompleteComponent,
        RoadtypeGeoFormComponent,
        RoadGeoAutocompleteComponent,
        RoadGeoFormComponent,
        AddressGeoAutocompleteComponent,
        AddressGeoFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BCNSharedModule,
        GeoBCNAPIModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule,
        NgSelectModule,
        BCNErrorComponent,
        MatFormFieldModule,
        // HttpClientJsonpModule,
    ],
    exports: [
        GeobcnMapComponent,
        NeighborhoodGeoAutocompleteComponent,
        NeighborhoodGeoFormComponent,
        DistrictGeoAutocompleteComponent,
        DistrictGeoFormComponent,
        RoadtypeGeoAutocompleteComponent,
        RoadtypeGeoFormComponent,
        RoadGeoAutocompleteComponent,
        RoadGeoFormComponent,
        AddressGeoAutocompleteComponent,
        AddressGeoFormComponent
    ]
})
export class GeoBCNModule {

}
