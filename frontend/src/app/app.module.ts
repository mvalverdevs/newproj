import { NgModule, Provider, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ApiInterceptor } from './services/api-jwt-configuration';

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule, 
    IonicStorageModule.forRoot()
  ],
  providers: [
    {
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
