import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError} from 'rxjs';
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private _router: Router
    ) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // Get userToken from localStorage
        let userToken = localStorage.getItem('accessToken')

        if (userToken == null){
            this._router.navigate(['/login']);
        }

        const _req = req.clone({
            setHeaders: {
            'Authorization': userToken!
            }
        });

        return next.handle(_req).pipe(
            tap((response: HttpEvent<any>) => {
                if (response instanceof HttpResponse) {
                    // Get token in login request and save it in localStorage
                    if (response.url && response.url.includes('/api/user/login/')){
                        let userToken = response.body.token
                        if (userToken) {
                            localStorage.setItem('accessToken', `Token ${userToken}`);
                        }
                    }
                }
            }),
            catchError((error) => {
                // If response is Unauthorized redirect to login
                if (error.status == 401){
                    this._router.navigate(['/login']);
                }
                console.error(error.status)
                return throwError(error);
            })
            );
    }
}