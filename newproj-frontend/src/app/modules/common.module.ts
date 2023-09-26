import {NgModule} from '@angular/core';
import {AppUtilsModule} from "../utils/utils.module";
import {FlexModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
@NgModule({
    declarations: [
  ],
    imports: [
        AppUtilsModule,
        FlexModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
    ],
    providers: []
})
export class AppCommonModule {
}
