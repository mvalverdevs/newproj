import {ApplicationConfig} from '@angular/core';
import {provideHttpClient, withInterceptors, withJsonpSupport} from '@angular/common/http';
import { authInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(
            withJsonpSupport(),
            withInterceptors([authInterceptor])),
    ]
}
