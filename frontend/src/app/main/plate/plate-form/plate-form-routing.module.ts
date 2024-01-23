import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlateFormPage } from './plate-form.page';

const routes: Routes = [
  {
    path: '',
    component: PlateFormPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlateFormPageRoutingModule {}
