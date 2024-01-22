import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlateListPage } from './plate-list.page';

const routes: Routes = [
  {
    path: '',
    component: PlateListPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlateListPageRoutingModule {}
