import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlateDetailPage } from './plateDetail.page';

const routes: Routes = [
  {
    path: '',
    component: PlateDetailPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlateDetailPageRoutingModule {}
