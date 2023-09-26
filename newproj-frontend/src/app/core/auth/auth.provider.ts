import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, Provider} from '@angular/core';
import {authInterceptor} from 'app/core/auth/auth.interceptor';
import {AuthService} from 'app/core/auth/auth.service';
import {UserLoginFormService} from "../../../api/forms/user/login/login.service";
import {CookieService} from "ngx-cookie";

export const provideAuth = (): Array<Provider | EnvironmentProviders> => {
    return [
        provideHttpClient(withInterceptors([authInterceptor])),
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue: () => inject(AuthService),
            multi: true,
        },{
            provide: UserLoginFormService,
            useValue: () => inject(UserLoginFormService),
            multi: true,
        },{
            provide: CookieService,
            useValue: () => inject(CookieService),
            multi: true,
        }
        // {
        //     provide: PermissionsPermissionsFormService,
        //     useValue: () => inject(PermissionsPermissionsFormService),
        //     multi: true,
        // },
    ];
};
