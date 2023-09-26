import {Injectable} from '@angular/core';
// import { ContentTypeContentTypeFormService } from 'api/form-service';
import {Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  public contentTypes$: Observable<object>;

  // constructor(private contentTypeFS: ContentTypeContentTypeFormService) {
  // // constructor() {
  //   const contentTypeSubject = new ReplaySubject<object>(1);
  //   this.contentTypeFS.form.patchValue({limit: 99999});
  //   this.contentTypeFS
  //     .submit(false, true, true)
  //     .pipe(
  //       map(val =>
  //         contentTypeSubject.next(
  //           val.results.reduce((res, obj) => {
  //             res[obj.model] = obj.id;
  //             return res;
  //           }, {})
  //         )
  //       )
  //     )
  //     .subscribe();
  //   this.contentTypes$ = contentTypeSubject.asObservable();
  //
  // }

  /*
  isAllowed (service: Service): Observable<boolean> {
    return this.whoami$.pipe(
      map(val => {
        let hit = false;
        val.acces.forEach(rol => {
          if ( Object.keys(service.xImiRoles).includes(rol) ) {
            hit = true;
          }
        });
        return hit;
      })
    );
  }*/
}
