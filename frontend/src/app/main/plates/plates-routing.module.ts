import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatesPage } from './plates.page';

const routes: Routes = [
  {
    path: '',
    component: PlatesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatesPageRoutingModule {}
