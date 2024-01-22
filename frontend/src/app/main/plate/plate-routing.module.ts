import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlateListPage } from './plate-list/plate-list.page';
import { PlateFormPage } from './plate-form/plate-form.page';
import { PlateDetailPage } from './plate-detail/plate-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PlateListPage,
},
{
    path: 'new',
    component: PlateFormPage,
},
{
    path: ':id/edit',
    component: PlateFormPage,
},
{
    path: ':id',
    component: PlateDetailPage,
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlateRoutingModule {}
