import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'plates',
        loadChildren: () => import('../plate/plate-list/plate-list.module').then(m => m.PlateListPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../plate/plate-form/plate-form.module').then(m => m.PlateFormPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../plate/plate-detail/plate-detail.module').then(m => m.PlateDetailPageModule)
      },
      {
        path: '',
        redirectTo: '/plates',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
