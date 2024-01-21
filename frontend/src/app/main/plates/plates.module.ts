import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlatesPage } from './plates.page';

import { PlatesPageRoutingModule } from './plates-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PlatesPageRoutingModule
  ],
  declarations: [PlatesPage]
})
export class PlatesPageModule {}
