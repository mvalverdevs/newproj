import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlateEditPage } from './plateEdit.page';

const routes: Routes = [
  {
    path: '',
    component: PlateEditPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlateEditPageRoutingModule {}
