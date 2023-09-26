import {Injectable} from '@angular/core';
import {
    UserCreateFormService, UserPartialUpdateFormService, UserReadFormService, UserUpdateFormService

} from 'api/form-service';

@Injectable({
    providedIn: 'root'
})
export class ActionService {

    constructor() {
    }

    public getAction(actionStr: string): any {
        try {
            const keys = actionStr.split('.');
            // if (action) {
            if (keys) {
                return {name:keys[0], action:keys[1]};
            } else {
                alert('Error obteniendo la acción del permiso: ' + actionStr);
            }
        } catch {
            debugger;
            alert('Error obteniendo la acción del permiso: ' + actionStr);
        }

    }
}
