import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpXsrfTokenExtractor} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from 'app/core/auth/auth.service';
import {catchError, Observable, throwError} from 'rxjs';
import {CookieService} from "ngx-cookie";
import {Router} from "@angular/router";

/**
 * Intercept
 *
 * @param req
 * @param next
 */
export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const authService = inject(AuthService);
    const tokenExtractor = inject(HttpXsrfTokenExtractor);
    const cookieService = inject(CookieService);
    const _router = inject(Router);

    // Clone the request object
    let newReq = req.clone();

    const headerName = 'X-CSRFTOKEN';
    const respHeaderName = 'X-Csrftoken';
    let token = authService.accessToken as string;
    if (token !== null && !req.headers.has(headerName)) {
        newReq = req.clone({headers: req.headers.set(respHeaderName, token)});
    }

    // Request
    //
    // If the access token didn't expire, add the Authorization header.
    // We won't add the Authorization header if the access token expired.
    // This will force the server to return a "401 Unauthorized" response
    // for the protected API routes which our response interceptor will
    // catch and delete the access token from the local storage while logging
    // the user out from the app.
    // if (authService.accessToken && !AuthUtils.isTokenExpired(authService.accessToken)) {
    //     newReq = req.clone({
    //         headers: req.headers.set('Authorization', 'Bearer ' + authService.accessToken),
    //     });
    // }


    // Response
    return next(newReq).pipe(
        catchError((error) => {
            // Catch "401 Unauthorized" responses
            if (error instanceof HttpErrorResponse && error.status === 401) {
                // Sign out
                authService.signOut();

                // Reload the app
                location.reload();
            }else if (error instanceof HttpErrorResponse && error.status === 403){

                //TODO Mirar esto bien
                _router.navigateByUrl(`403`);
                localStorage.clear();
                // Sign out
                authService.signOut();
                // Reload the app
                location.reload();

            }

            return throwError(error);
        }),
    );
};
