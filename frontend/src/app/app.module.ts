import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiModule } from 'src/api/api.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: 'http://localhost:8000' })
  ],
  providers: [
    {
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}