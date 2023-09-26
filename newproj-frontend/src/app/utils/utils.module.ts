import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyChip, MatLegacyChipsModule } from "@angular/material/legacy-chips";
import { MatSelectModule } from "@angular/material/select";
import { NgSelectModule } from "@ng-select/ng-select";
import { BCNErrorComponent } from "../../@bcn/components/bcn-error/bcn-error.component";
import { AreaAutocompleteComponent } from "./components/autocompletes/area-autocomplete/area-autocomplete.component";
import {
    IndretsAutocompleteComponent
} from "./components/autocompletes/indrets-autocomplete/indrets-autocomplete.component";
import {
    MasterTableTypesAutocompleteComponent
} from "./components/autocompletes/master-table-types-autocomplete/master-table-types-autocomplete.component";
import { RolAutocompleteComponent } from "./components/autocompletes/rol-autocomplete/rol-autocomplete.component";
import {
    SelectAutocompleteComponent
} from "./components/autocompletes/select-autocomplete/select-autocomplete.component";
import { IfAllowedDirective } from "./directives/if-allowed.directive";
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import { ExampleAutocompleteComponent } from './components/autocompletes/example-autocomplete/example-autocomplete.component';
import { IndretsCircuitsAutocompleteComponent } from './components/autocompletes/indrets-circuits-autocomplete/indrets-circuits-autocomplete.component';
import { UsersAutocompleteComponent } from './components/autocompletes/users-autocomplete/users-autocomplete.component';
import { RemoveCommaPipe } from './pipe/removeComma.pipe';
import { UppercaseDirective } from './directives/upper.directive';
import { IsShownDirective } from './directives/is-shown.directive';


@NgModule({
    declarations: [
        AreaAutocompleteComponent,
        RolAutocompleteComponent,
        MasterTableTypesAutocompleteComponent,
        IndretsAutocompleteComponent,
        IfAllowedDirective,
        IsShownDirective,
        UppercaseDirective,
        SelectAutocompleteComponent,
        ExampleAutocompleteComponent,
        IndretsCircuitsAutocompleteComponent,
        UsersAutocompleteComponent,
        RemoveCommaPipe,
    ],
    imports: [
        NgSelectModule,
        FlexLayoutModule,
        BCNErrorComponent,
        FormsModule,
        MatChipsModule,
        MatIconModule,
        MatLegacyChipsModule,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule
    ],
    exports: [
        RemoveCommaPipe,
        CommonModule,
        ReactiveFormsModule,
        NgSelectModule,
        FlexLayoutModule,
        BCNErrorComponent,
        FormsModule,
        MatChipsModule,
        MatIconModule,
        MatLegacyChipsModule,
        AreaAutocompleteComponent,
        RolAutocompleteComponent,
        MasterTableTypesAutocompleteComponent,
        IndretsAutocompleteComponent,
        IfAllowedDirective,
        SelectAutocompleteComponent,
        ExampleAutocompleteComponent,
        UsersAutocompleteComponent,
        IndretsCircuitsAutocompleteComponent,
        UppercaseDirective,
        IsShownDirective

    ],
    providers: [
        MatLegacyChip
    ],
})

export class AppUtilsModule {
}
