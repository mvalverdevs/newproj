import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { LoaderComponent } from './loader.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [ 
    CommonModule,
    BrowserModule,
    IonicModule,
    LoaderComponent
  ],
  declarations: [
    LoaderComponent
  ],
  exports: [
    LoaderComponent
  ],
  bootstrap: [
    LoaderComponent
  ]
})

export class LoaderModule { }