import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
// import {Permission, User} from 'api/model';

import {catchError, Observable, of, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';

import {PermissionsPermissionsFormService} from "../../api/forms/permissions/permissions/permissions.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public whoami$: Observable<any>;
    public impersonatedRole = null;

    constructor(
        private http: HttpClient,
        private _permissionsPermissionsFormService: PermissionsPermissionsFormService
    ) {
        const whoamiSubject = new ReplaySubject<any>(1);
        this._permissionsPermissionsFormService.submit().pipe(
            map(val => {
                let all = [];
                for (let i = 0; i < val['length']; i++) {
                    let id = val[i].url.indexOf(':') !== -1;
                    let name = val[i].url.substring(5).replaceAll(':', '')
                        .replaceAll('/', '');
                    let action = '';
                    switch (val[i].action) {
                        case 'get':
                            action = id ? 'read' : 'list';
                            break;
                        case 'post':
                            action = 'create';
                            break;
                        // case 'put':
                        //     action = 'update';
                        //     break;
                        case 'patch':
                            action = 'update';
                            break;
                    }
                    all.push({name: name, action: action})
                }
                whoamiSubject.next(all);
            }),
            catchError(() => {
                return of([]);
            })
        ).subscribe();
        this.whoami$ = whoamiSubject.asObservable();
    }


    setRole(role: string): void {
        if (role) {
            this.impersonatedRole = [role];
        } else {
            this.impersonatedRole = null;
        }
    }

    isAllowed(services: [any] | object): Observable<boolean> {

        // Allow array or objects
        let serv = [];
        if (Array.isArray(services)) {
            serv = services;
        } else {
            serv.push(services);
        }

        if (serv.length > 0) {
            return this.whoami$.pipe(
                map(permissions => {
                    let hit = false;
                    serv.forEach(service => {
                        permissions.forEach(permission => {
                            if (permission.name === service.name && permission.action === service.action) {
                                hit = true;
                            }
                        })
                    });
                    return hit;
                })
            );
        } else {
            return of(true);
        }
    }

    // get onExpire(): Observable<number> {
    //   return this._expireEvent.asObservable();
    // }
}
