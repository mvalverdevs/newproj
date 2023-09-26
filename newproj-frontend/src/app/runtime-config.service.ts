import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RuntimeConfigService {
    private runtimeConfig;
    public _expireEvent: Subject<number> = new Subject();

    constructor(private injector: Injector) {
    }

    loadRuntimeConfig() {
        const http = this.injector.get(HttpClient);

        return http.get(
            '/assets/config/runtime-config.json',
            {
                headers: {'X-Skip-AuthInterceptor': 'yes'}
            })
            .toPromise()
            .then(data => {
                this.runtimeConfig = data;
            })
            .catch(error => {
                console.warn('Error loading /assets/config/runtime-config.json');
                this.runtimeConfig = null;
            });
    }

    get config() {
        return this.runtimeConfig;
    }

    get onExpire(): Observable<number> {
        return this._expireEvent.asObservable();
    }
}
