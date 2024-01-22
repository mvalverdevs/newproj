import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlateListPage } from './plate-list.page';

import { PlateListPageRoutingModule } from './plate-list-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PlateListPageRoutingModule
  ],
  declarations: [PlateListPage]
})
export class PlateListPageModule {}
