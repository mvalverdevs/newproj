import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlateEditPage } from './plateEdit.page';
import { PlateEditPageRoutingModule } from './plateEdit-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PlateEditPageRoutingModule
  ],
  declarations: [PlateEditPage]
})
export class PlateEditPageModule {}
