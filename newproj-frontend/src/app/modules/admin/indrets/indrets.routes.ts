import {Routes} from '@angular/router';
import {IndretsViewComponent} from "./indrets-view/indrets-view.component";
import {IndretsEditComponent} from "./indrets-edit/indrets-edit.component";
import {IndretsListComponent} from "./indrets-list/indrets-list.component";
import {IndretsCreateComponent} from "./indrets-create/indrets-create.component";

export default [
    {
        path: '',
        component: IndretsListComponent,
    },
    {
        path: 'new',
        component: IndretsCreateComponent
    },
    {
        path: ':id/edit',
        component: IndretsEditComponent
    },
    {
        path: ':id',
        component: IndretsViewComponent
    }
] as Routes;
