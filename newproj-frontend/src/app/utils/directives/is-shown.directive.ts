import {Directive, Input, ElementRef, TemplateRef, ViewContainerRef} from '@angular/core';
import {map, take, tap} from 'rxjs/operators';
import {AuthService} from "../auth.service";
import {ActionService} from "../../action.service";
import { GeneralMasterTablesListFormService } from 'api/form-service';
import { result } from 'lodash';

@Directive({
    selector: '[isShown]'
})
export class IsShownDirective {
    constructor(
        private element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private gmTableFS: GeneralMasterTablesListFormService
    ) {
    }

    @Input()
    set isShown(val) {

        this.viewContainer.clear();
        let behaviours = val[1];
        let ids="";
        val[0].forEach(value => {
            value.forEach((id,i,arr)=>{
                ids+=id
                if(arr.length -1 != i){
                    ids+=","
                }
            })
        });
        if(behaviours){
            this.gmTableFS.submit({behaviour_ids:behaviours,id_filter:ids}).pipe(
                take(1),
                map(result => result.results),
                tap(tables => {
                    if (tables.find(table => ids.includes(table.id.toString()))) {
                        this.viewContainer.createEmbeddedView(this.templateRef);
                    } else {
                        this.viewContainer.clear();
                    }
                }),
            ).subscribe()
        } else {
            this.viewContainer.clear();
        }

    }

}
