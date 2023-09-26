import {RouterModule, Routes} from '@angular/router';
import { ActionsListComponent } from './actions-list/actions-list.component';
import { ActionsCreateComponent } from './actions-create/actions-create.component';
import { ActionsEditComponent } from './actions-edit/actions-edit.component';
import { ActionsViewComponent } from './actions-view/actions-view.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
    {
        path: '',
        component: ActionsListComponent
    },
    {
        path: 'new/:indret',
        component: ActionsCreateComponent
    },
    {
        path: 'new',
        component: ActionsCreateComponent
    },
    {
        path: ':id/edit',
        component: ActionsEditComponent
    },
    {
        path: ':id',
        component: ActionsViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ActionsRoutingModule {
}
