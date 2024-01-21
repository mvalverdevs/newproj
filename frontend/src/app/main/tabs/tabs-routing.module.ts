import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../plates/plates.module').then(m => m.PlatesPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../plateEdit/plateEdit.module').then(m => m.PlateEditPageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../plateDetail/plateDetail.module').then(m => m.PlateDetailPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
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
