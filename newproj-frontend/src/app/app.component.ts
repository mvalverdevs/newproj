import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BreadcrumbService } from './utils/breadcrumbs.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    standalone : true,
    imports    : [RouterOutlet],
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(
        public _breadcrumbs:BreadcrumbService,
        private _router:Router,
        protected activatedRoute: ActivatedRoute,

    )
    {   
        this._router.events.subscribe(value=> {
            if(value instanceof NavigationEnd){
               this.parseUrlBreadcrumbs(value.url);
            } 
        })
    }

    parseUrlBreadcrumbs(url:string){
        const regexVowel = /[aeiou]/g
        const regexNumber = /[0-9]/g
        let value = url.split('/').slice(1);
        if(value.length > 0){
            let title = value[0].split('#')[0].replaceAll('_',' ')
            this._breadcrumbs.setTitle(title);
            if(value.length==1){
                if(value[0][0].match(regexVowel)){
                    this._breadcrumbs.setSubtitle("Llistat d'"+title)
                }else{
                    this._breadcrumbs.setSubtitle("Llistat de "+title)
                }
            } else {
                if(value.length==2){
                    if(value[1].match(regexNumber)){
                        if(value[0][0].match(regexVowel)){
                            this._breadcrumbs.setSubtitle("Detall d'"+title);
                        }else{
                            this._breadcrumbs.setSubtitle("Detall de "+title);
                        }
                    }else{
                        if(value[0][0].match(regexVowel)){
                            this._breadcrumbs.setSubtitle("Creació d'"+title);
                        }else{
                            this._breadcrumbs.setSubtitle("Creació de "+title);
                        }

                    }
                } else {
                    if(value[1].match(regexNumber)){
                        if(value[0][0].match(regexVowel)){
                            this._breadcrumbs.setSubtitle("Edició d'"+title);
                        }else{
                            this._breadcrumbs.setSubtitle("Edició de "+title);
                        }
                    }   
                }
            }
        }else{
            this._breadcrumbs.setTitle('');
            this._breadcrumbs.setSubtitle('');
        }
    }
}
