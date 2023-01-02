import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignLocationPage } from './assign-location.page';

const routes: Routes = [
  {
    path: '',
    component: AssignLocationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignLocationPageRoutingModule {}
