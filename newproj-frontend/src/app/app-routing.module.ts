import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/common.module').then(m => m.AppCommonModule),
        data: {
            discriminantPathKey: 'PUBLIC'
        }
    },
    {
        path: '**',
        redirectTo: 'inici',
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
