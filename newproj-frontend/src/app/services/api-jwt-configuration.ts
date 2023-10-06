
import { Injectable } from '@angular/core';
import { UserService } from '../api/services';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, from, mergeMap, of, tap } from 'rxjs';
import { User } from '../api/models';
import { Router } from '@angular/router';
import { ApiConfiguration } from '../api/api-configuration';
import { AuthService } from './auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    constructor(
      private authService: AuthService,
      private router: Router,
    ){}

    private conf = new ApiJWTConfiguration();

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Check pages without JWT injection (Login and register)
      console.log(req.url);
      if (req.url.includes('/login') || req.url.includes('/check_user')) {
        return next.handle(req);
      }
      // Take user for the checks
      return from(this.authService.getUser()).pipe(
        mergeMap(user => {
          console.log('Saved user: ', user);

          // Renew token if is going to expire
          const expiryDate = new Date(new Date().setMinutes(new Date().getMinutes() + 10));
          if (new Date(user.token_expiry) <= expiryDate) {
            // Renew the token and save it
            user = this.conf.updateJwtToken(user, next);
            this.authService.setUser(user);
          }
          // Inject the token in request
          this.conf.useJwtToken(user);
          req = this.conf.apply(req);
    
          return next.handle(req).pipe(
            tap(x => x, err => {
              console.error('Token out of date');
              // Op1: Re login automatically
              /*
              this.authService.getUser().then(user => {
                console.log(1, user);
                this.authService.login(user.username, user.password).subscribe(
                  isAuthenticated => {
                    console.log('isAuthenticated', isAuthenticated);
                    if (!isAuthenticated) {
                      console.error(3);
                    } 
                  });;
                this.authService.getUser().then(user => {
                  this.conf.newJwtToken(user, next);
                  req = this.conf.apply(req);
                });
              });
              console.error(`Error performing request, status code = ${err.status}`);
              */
              //Op2: Redirect to login page automatically
              this.router.navigate(['/login']);
            })
          );
        }),
        catchError(() => {
          console.error('There is no user storaged');
          return next.handle(req).pipe(
            tap(x => x, err => {
              // Op1: Renew user
              /*console.log('error con la sesion');
              this.authService.getUser().then(user => {
                console.log(2, user);
                this.authService.setUser(this.conf.newJwtToken(user, next));
              });
              console.error(`Error performing request, status code = ${err.status}`);
              */
             //Op2: Redirect to login page automatically
             this.router.navigate(['/login']);
            })
          );
        })
      );
    }
    
    
}

@Injectable()
export class ApiJWTConfiguration {
  private nextAuthHeader: string;
  private nextAuthValue: string;
  private userService: UserService;
  

  rootUrl: string = 'https://feats-app.com:8000';

  newJwtToken(user: User, next: HttpHandler){
    this.userService = new UserService(new ApiConfiguration(), new HttpClient(next));
    let new_user: User;
    console.log('newJwtToken user', user);
    this.userService.userLoginCreate$FormData(
        {
          body: {
            username: user.username,
            password: user.password,
          }
        }).subscribe({
        next: (user) => {
            this.nextAuthHeader = 'Authorization';
            this.nextAuthValue = 'JWT ' + user.token;
            console.log(user.token);
            new_user = user;
        },
        error: (e) => {
          console.log('aaa');
          console.log(e);
        },
        complete: () => {
          console.log('user login');
        }
      });
      return new_user;
  }
  
  updateJwtToken(user: User, next: HttpHandler){
    this.userService = new UserService(new ApiConfiguration(), new HttpClient(next));
    let new_user: User;
    this.userService.userUpdateTokenCreate$FormData(
        {
          body: {
            username: user.username,
            token: user.token,
          }
        }).subscribe({
        next: (user) => {
            new_user = user;
        },
        error: (e) => {
          console.log('aaa');
          console.log(e);
        },
        complete: () => {
          console.log('user login');
        }
      });
      return new_user;
  }

  useJwtToken(user: User){
    this.nextAuthHeader = 'Authorization';
    this.nextAuthValue = 'JWT ' + user.token;
  }

  /** Clear any authentication headers (to be called after logout) */
  clear(): void {
    this.nextAuthHeader = null;
    this.nextAuthValue = null;
  }

  /** Apply the current authorization headers to the given request */
  apply(req: HttpRequest<any>): HttpRequest<any> {
    const headers: any = {};
    if (this.nextAuthHeader) {
      headers[this.nextAuthHeader] = this.nextAuthValue;
    }
    // Apply the headers to the request
    return req.clone({
      setHeaders: headers
    });
  }
}