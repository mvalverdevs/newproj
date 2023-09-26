import {Directive, Input, ElementRef, TemplateRef, ViewContainerRef} from '@angular/core';
import {tap} from 'rxjs/operators';
import {AuthService} from "../auth.service";
import {ActionService} from "../../action.service";

@Directive({
    selector: '[ifAllowed]'
})
export class IfAllowedDirective {

    constructor(
        private element: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authService: AuthService,
        private actionService: ActionService
    ) {
    }

    @Input()
    set ifAllowed(val) {
        const action = this.actionService.getAction(val);

        if (action) {
            this.authService.isAllowed(action).pipe(
                tap(isAllowed => {
                    if (isAllowed) {
                        this.viewContainer.createEmbeddedView(this.templateRef);
                    } else {
                        this.viewContainer.clear();
                    }
                })
            ).subscribe();
        } else {
            this.viewContainer.clear();
        }

    }

}
