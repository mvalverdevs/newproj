import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MAT_CHIPS_DEFAULT_OPTIONS
} from '@angular/material/chips';
import { getCatPaginatorIntl } from './i18n/cat-paginator-intl';

// 3rd Material components
// here is the default text string



@NgModule({
  imports: [
    // MatButtonModule,
    // MatCheckboxModule,
    // MatFormFieldModule,
    // MatSelectModule,
    // MatInputModule,
    // MatRadioModule,
    // MatIconModule,
    // MatDividerModule,
    // MatSnackBarModule,
    // MatTableModule,
    // MatPaginatorModule,
    // MatProgressSpinnerModule,
    // MatAutocompleteModule,
    // MatDialogModule,
    // MatCardModule,
    // MatListModule,
    // MatChipsModule,
    // MatDatepickerModule,
    // MatMomentDateModule,
    // MatTabsModule,
    // MatTreeModule,
    // MatStepperModule,
    // MatExpansionModule,
    // MatMenuModule,
    // MatSlideToggleModule,
    // MatProgressBarModule,
    // MatTooltipModule,
    // MatButtonToggleModule,
    // MatSliderModule,
    // MatMomentDateModule,
    // MatDatepickerModule,
    // // 3rd Party Modules
    // NgSelectModule,
    // NgOptionHighlightModule,
    // NgxMaterialTimepickerModule,
  ],
  exports: [
    // MatButtonModule,
    // MatCheckboxModule,
    // MatFormFieldModule,
    // MatSelectModule,
    // MatInputModule,
    // MatRadioModule,
    // MatIconModule,
    // MatDividerModule,
    // MatSnackBarModule,
    // MatTableModule,
    // MatPaginatorModule,
    // MatProgressSpinnerModule,
    // MatAutocompleteModule,
    // MatDialogModule,
    // MatCardModule,
    // MatListModule,
    // MatChipsModule,
    // MatDatepickerModule,
    // MatMomentDateModule,
    // MatTabsModule,
    // MatTreeModule,
    // MatStepperModule,
    // MatExpansionModule,
    // MatMenuModule,
    // MatSlideToggleModule,
    // MatProgressBarModule,
    // MatTooltipModule,
    // MatButtonToggleModule,
    // MatSliderModule,
    //
    // // 3rd Party Modules
    // NgSelectModule,
    // NgOptionHighlightModule,
    // NgxMaterialTimepickerModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    MatDatepickerModule,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 4000}},
    {provide: MatPaginatorIntl, useValue: getCatPaginatorIntl()},
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
    },

  ]
})
export class SipsMaterialModule {
}
