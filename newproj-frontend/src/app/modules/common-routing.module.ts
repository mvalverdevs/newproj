import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Error403Component} from './error403/error403.component';
import {IniciComponent} from "./admin/inici/inici.component";

const routes: Routes = [
    {
        path: '403',
        component: Error403Component
    },
    {
        path: 'inici',
        component: IniciComponent,
    },
    {
        path: '**',
        redirectTo: 'inici',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CommonRoutingModule {
}
