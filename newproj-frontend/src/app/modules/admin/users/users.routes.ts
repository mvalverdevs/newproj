import {Routes} from '@angular/router';
import {UsersListComponent} from "./users-list/users-list.component";
import {UsersCreateComponent} from "./users-create/users-create.component";
import {UsersEditComponent} from "./users-edit/users-edit.component";
import {UsersViewComponent} from "./users-view/users-view.component";

export default [
    {
        path: '',
        component: UsersListComponent,
    },
    {
        path: 'new',
        component: UsersCreateComponent
    },
    {
        path: ':id/edit',
        component: UsersEditComponent
    },
    {
        path: ':id',
        component: UsersViewComponent
    }
] as Routes;
