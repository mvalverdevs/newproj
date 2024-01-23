import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlateFormPage } from './plate-form.page';
import { PlateFormPageRoutingModule } from './plate-form-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PlateFormPageRoutingModule
  ],
  declarations: [PlateFormPage]
})
export class PlateFormPageModule {}
