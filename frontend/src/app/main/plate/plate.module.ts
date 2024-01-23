import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlateDetailPage } from './plate-detail/plate-detail.page';
import { PlateRoutingModule } from './plate-routing.module';
import { PlateFormPage } from './plate-form/plate-form.page';
import { PlateListPage } from './plate-list/plate-list.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PlateRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    PlateDetailPage,
    PlateFormPage,
    PlateListPage
  ]
})
export class PlateModule {}
