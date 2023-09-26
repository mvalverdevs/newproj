import { NgModule } from "@angular/core";
import { MomentDateModule } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActionsFormComponent } from "./actions-form/actions-form.component";
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from "@angular-material-components/datetime-picker";
import { NgxMatMomentModule } from "@angular-material-components/moment-adapter";
import { NgIf, CommonModule, AsyncPipe, NgClass, NgForOf, TitleCasePipe } from "@angular/common";
import { ExtendedModule, FlexLayoutModule, FlexModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTableModule } from "@angular/material/table";
import { RouterLink, RouterModule } from "@angular/router";
import { BCNErrorComponent } from "@bcn/components/bcn-error/bcn-error.component";
import { FakeLoadingModule } from "@bcn/components/fake-loading/fake-loading.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { ngfModule } from "angular-file";
import { GeoBCNModule } from "app/utils/components/geobcn/geobcn.module";
import { InputFileFormComponent } from "app/utils/components/input-file-form/input-file-form.component";
import { AppUtilsModule } from "app/utils/utils.module";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { ActionsCreateComponent } from "./actions-create/actions-create.component";
import { ActionsEditComponent } from "./actions-edit/actions-edit.component";
import { ActionsListComponent } from "./actions-list/actions-list.component";
import { ActionsTableComponent } from "./actions-table/actions-table.component";
import { ActionsViewComponent } from "./actions-view/actions-view.component";
import { PaginatedTableComponent } from "@bcn/components/paginated-table/paginated-table.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DocumentLibraryService } from "api/controllers/DocumentLibrary";
import { GeneralMasterTablesService } from "api/controllers/GeneralMasterTables";
import { IndretActionPartialUpdateFormService, IndretActionCreateFormService, IndretActionReadFormService, GeneralMasterTablesListFormService, DocumentLibraryCreateFormService, DocumentLibraryPartialUpdateFormService, DocumentLibraryDeleteFormService, PermissionsPermissionsFormService, IndretActionListFormService, IndretListFormService, IndretCircuitListFormService, UserListFormService } from "api/form-service";
import { ActionsRoutingModule } from "./actions.routes";
import { AuthService } from "app/utils/auth.service";
import { PermissionsService } from "api/controllers/Permissions";
import { IndretActionService } from "api/controllers/IndretAction";
import { IndretService } from "api/controllers/Indret";
import { MatTabsModule } from "@angular/material/tabs";
import { GeneralActionComponent } from "./actions-form/general/general.component";
import { DocumentComponent } from "./actions-form/document/document.component";
import { IndretCircuitService } from "api/controllers/IndretCircuit";
import { UserService } from "api/controllers/User";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { LuxonDateAdapter } from "@angular/material-luxon-adapter";
import { MatSortModule } from "@angular/material/sort";

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: ['l','LL'],
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@NgModule({
    declarations: [
        DocumentComponent,
        GeneralActionComponent,
        ActionsFormComponent,
        ActionsTableComponent,
        ActionsCreateComponent,
        ActionsEditComponent,
        ActionsViewComponent,
        ActionsListComponent,
    ],
    imports: [
        AppUtilsModule,
        ActionsRoutingModule,
        RouterModule,
        CommonModule,
        RouterLink,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        NgSelectModule,
        ReactiveFormsModule,
        MatDividerModule,
        FakeLoadingModule,
        BCNErrorComponent,
        MatExpansionModule,
        MatRadioModule,
        MatSelectModule,
        InputFileFormComponent,
        MatProgressSpinnerModule,
        MatListModule,
        MatTableModule,
        ngfModule,
        MatGridListModule,
        AsyncPipe,
        ExtendedModule,
        FlexModule,
        MatCheckboxModule,
        NgClass,
        NgForOf,
        NgIf,
        PaginatedTableComponent,
        TitleCasePipe,
        MatTabsModule,
        MatSortModule,

        NgxMaterialTimepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        NgxMatMomentModule,
        MatDatepickerModule,
        
    ],
    exports: [
        MatInputModule,
        MatIconModule,
        RouterLink,
        FlexLayoutModule,
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
        
        ActionsFormComponent,
        ActionsTableComponent,

    ],
    providers: [
        MatSnackBar,
        AuthService,
        PermissionsService,
        IndretService,
        IndretListFormService,
        IndretCircuitService,
        IndretCircuitListFormService,
        IndretActionService,
        IndretActionReadFormService,
        IndretActionListFormService,
        IndretActionCreateFormService,
        IndretActionPartialUpdateFormService,
        PermissionsPermissionsFormService,
        GeneralMasterTablesListFormService,
        GeneralMasterTablesService,
        DocumentLibraryService,
        DocumentLibraryCreateFormService,
        DocumentLibraryPartialUpdateFormService,
        DocumentLibraryDeleteFormService,
        UserService,
        UserListFormService,
        { provide: DateAdapter, useValue: new LuxonDateAdapter('ca', {
            firstDayOfWeek: 1, 
            useUtc: true 
        }) },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    ],
})
export class ActionsModule {}
