import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlateDetailPage } from './plateDetail.page';
import { PlateDetailPageRoutingModule } from './plateDetail-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PlateDetailPageRoutingModule
  ],
  declarations: [PlateDetailPage]
})
export class PlateDetailPageModule {}
