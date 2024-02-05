import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginPage} from "./main/login/login.page";
import {RegisterPage} from "./main/register/register.page";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from 'src/api/api.module';
import {provideHttpClient, withInterceptors, withJsonpSupport} from '@angular/common/http';
import { authInterceptor } from './auth/auth.interceptor';
import { StepCheckEmailComponent } from './main/register/components/step-check-email/step-check-email.component';
import { StepPasswordComponent } from './main/register/components/step-password/step-password.component';
import { StepCheckUsernameComponent } from './main/register/components/step-check-username/step-check-username.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    RegisterPage,
    StepCheckEmailComponent,
    StepPasswordComponent,
    StepCheckUsernameComponent
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
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
