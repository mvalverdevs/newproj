import { NgxMatMomentModule } from "@angular-material-components/moment-adapter";
import { CommonModule, NgIf } from "@angular/common";
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTableModule } from "@angular/material/table";
import { RouterLink } from "@angular/router";
import { NgSelectModule } from "@ng-select/ng-select";
import { ngfModule } from "angular-file";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { BCNErrorComponent } from "../../../../@bcn/components/bcn-error/bcn-error.component";
import { FakeLoadingModule } from "../../../../@bcn/components/fake-loading/fake-loading.module";
import { IndretService } from "../../../../api/controllers/Indret";
import { IndretListFormService } from "../../../../api/forms/indret/list/list.service";
import { GeoBCNModule } from "../../../utils/components/geobcn/geobcn.module";
import { InputFileFormComponent } from "../../../utils/components/input-file-form/input-file-form.component";
import { AppUtilsModule } from "../../../utils/utils.module";
import { CircuitsComponent } from './indrets-form/circuits/circuits.component';
import { CompanyComponent } from './indrets-form/circuits/company/company.component';
import { MenjadorComponent } from './indrets-form/circuits/menjador/menjador.component';
import { SamplePointsComponent } from './indrets-form/circuits/samplePoints/samplePoint.component';
import { ContacteComponent } from './indrets-form/contacte/contacte.component';
import { DocumentComponent } from "./indrets-form/document/document.component";
import { GeneralComponent } from './indrets-form/general/general.component';
import { TitularsComponent } from './indrets-form/titulars/titulars.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from "@angular-material-components/datetime-picker";
import { MatDatepickerModule } from "@angular/material/datepicker";

@NgModule({
    declarations: [
        GeneralComponent,
        TitularsComponent,
        ContacteComponent,
        DocumentComponent,
        CircuitsComponent,
        SamplePointsComponent,
        CompanyComponent,
        MenjadorComponent,
  ],
    imports: [
        NgIf,
        CommonModule,
        RouterLink,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        NgSelectModule,
        ReactiveFormsModule,
        MatDividerModule,

        FakeLoadingModule,
        BCNErrorComponent,
        MatInputModule,
        
        MatExpansionModule,
        AppUtilsModule,
        GeoBCNModule,
        MatRadioModule,
        MatCheckboxModule,
        NgxMaterialTimepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        NgxMatMomentModule,
        MatDatepickerModule,
        MatSelectModule,
        InputFileFormComponent,
        MatProgressSpinnerModule,
        MatListModule,
        MatTableModule,
        ngfModule,
        MatGridListModule,
        MatSlideToggleModule
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


        GeneralComponent,
        TitularsComponent,
        ContacteComponent,
        CircuitsComponent,
        DocumentComponent
    ],
    providers: [
        IndretService,
        IndretListFormService,
    ]
})
export class IndretsModule {
}
