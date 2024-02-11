import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Router } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginPage} from "./main/login/login.page";
import {RegisterPage} from "./main/register/register.page";
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiModule } from 'src/api/api.module';
import { StepCheckEmailComponent } from './main/register/components/step-check-email/step-check-email.component';
import { StepCheckUsernameComponent } from './main/register/components/step-check-username/step-check-username.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ProfilePage } from './main/profile/profile.page';



@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    RegisterPage,
    StepCheckEmailComponent,
    StepCheckUsernameComponent,
    ProfilePage,
    
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: 'http://localhost:8000' })
  ],
  providers: [
    Router,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [Router],
    } as any,
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
