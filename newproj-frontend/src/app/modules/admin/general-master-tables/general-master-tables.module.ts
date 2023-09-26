import {NgModule} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDividerModule} from "@angular/material/divider";
import {NgIf} from "@angular/common";
import {FakeLoadingModule} from "../../../../@bcn/components/fake-loading/fake-loading.module";
import {BCNErrorComponent} from "../../../../@bcn/components/bcn-error/bcn-error.component";
import {MatInputModule} from "@angular/material/input";

@NgModule({
    declarations: [],
    imports: [
        NgIf,
        RouterLink,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        NgSelectModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatDividerModule,

        FakeLoadingModule,
        BCNErrorComponent,
        MatInputModule,
    ],
    exports: [
        RouterLink,
        FlexLayoutModule,
        MatIconModule,
        MatButtonModule,
        NgIf,
        ReactiveFormsModule,
        MatDividerModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        NgSelectModule,
        MatCheckboxModule,

        FakeLoadingModule,
        BCNErrorComponent,
        MatInputModule,
    ],
    providers: [
    ]
})
export class GeneralMasterTablesModule {
}
